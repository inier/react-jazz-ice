import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpOption {
  throttle?: {
    wait: number;
    mergeConfig: (previousConfig: AxiosRequestConfig, currentConfig: AxiosRequestConfig) => AxiosRequestConfig;
    assignResponse: (response: AxiosResponse<any>, config: AxiosRequestConfig) => AxiosResponse<any>;
  };
  cache?: {
    set: (config: AxiosRequestConfig, response: AxiosResponse<any>) => void;
    get: (config: AxiosRequestConfig) => any;
  };
}

interface HttpRequest {
  resolve: (value: AxiosResponse<any> | PromiseLike<AxiosResponse<any>>) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}

export default class Http {
  response;
  request: any;
  // 以 method 和 url 区分请求类型，保存不同类型的配置项
  optionList: Partial<{ [key: string]: HttpOption }> = {};
  // 节流请求的 timeout 列表
  timeoutList: Partial<{ [key: string]: number }> = {};
  // 节流请求的临时列表
  throttleList: Partial<{ [key: string]: HttpRequest[] }> = {};
  // 真实请求列表
  requestList: Partial<{ [key: string]: HttpRequest[] }> = {};
  constructor(defaultConfig?: AxiosRequestConfig) {
    this.response = axios.create(defaultConfig);
    this.request = axios.create(defaultConfig);

    this.request.interceptors.request.use((config) => {
      if (!config.url) return config;
      const typeKey = this.getTypeKey(config.url, config.method);
      const option = this.optionList[typeKey];

      // 有缓存的话直接直接返回缓存，并且不再通过转换函数;
      const cache = option?.cache?.get(config);
      if (cache) {
        return {
          ...config,
          transformRequest(data) {
            return data;
          },
          adapter: () =>
            new Promise((resolve) => {
              resolve({
                data: cache,
                status: 200,
                statusText: 'OK', // 这里应该需要根据服务器返回进行修改
                headers: config.headers,
                config,
              });
            }),
        };
      }

      // 没有缓存的请求分为节流请求和普通请求
      if (option?.throttle?.wait) {
        // 在节流时间后合并config，发起真实请求。转移节流请求列表到真实请求列表中
        if (!this.timeoutList[typeKey]) {
          this.timeoutList[typeKey] = window.setTimeout(() => {
            clearTimeout(this.timeoutList[typeKey]);
            delete this.timeoutList[typeKey];
            const mergeConfig = option.throttle ? this.mergeConfig(typeKey, option.throttle) : config;
            const mergeRequestKey = this.getKeyFromRequest(mergeConfig);
            // 多次相同的合并请求去抖动
            if (!this.requestList[mergeRequestKey]) this.response(mergeConfig);
            this.requestList[mergeRequestKey] = (this.requestList[mergeRequestKey] ?? []).concat(
              this.throttleList[typeKey] ?? [],
            );
            delete this.throttleList[typeKey];
          }, option.throttle.wait);
        }

        return {
          ...config,
          adapter: () =>
            new Promise<any>((resolve, reject) => {
              this.throttleList[typeKey] = (this.throttleList[typeKey] ?? []).concat({
                resolve,
                reject,
                config,
              });
            }),
        };
      } else {
        // 发起真实请求，在请求未返回前去抖动重复的请求
        const requestKey = this.getKeyFromRequest(config);
        if (!this.requestList[requestKey]) this.response(config);

        return {
          ...config,
          adapter: () =>
            new Promise<any>((resolve, reject) => {
              this.requestList[requestKey] = (this.requestList[requestKey] ?? []).concat({
                resolve,
                reject,
                config,
              });
            }),
        };
      }
    });

    this.response.interceptors.response.use((response: AxiosResponse) => {
      // 响应的 config 和请求的 config 并不相同，它是请求发起时使用的真实值。
      const { config } = response;
      const requestKey = this.getKeyFromResponse(config);
      if (!config.url) return response;
      const typeKey = this.getTypeKey(config.url, config.method);
      const option = this.optionList[typeKey];

      // 分配响应给请求列表中的所有请求
      this.requestList[requestKey]?.forEach(({ resolve, config: tConfig }) => {
        const resolveResponse = option?.throttle?.assignResponse(response, tConfig) ?? response;

        // 配置了 cache 时写入缓存
        option?.cache?.set(tConfig, resolveResponse);
        resolve(resolveResponse);
      });
      delete this.requestList[requestKey];

      return response;
    });
  }

  // 节流请求合并config
  mergeConfig(typeKey: string, throttle: NonNullable<HttpOption['throttle']>): AxiosRequestConfig {
    return (this.throttleList[typeKey] ?? []).reduce((p, c) => {
      return throttle.mergeConfig(p, c.config);
    }, {});
  }

  // 请求阶段获取具有相同config的请求的唯一值，作为区分不同请求的key
  getKeyFromRequest(config: AxiosRequestConfig) {
    return JSON.stringify({
      ...config,
      headers: undefined,
      data: () => {
        // eslint-disable-next-line no-nested-ternary
        return config.transformRequest
          ? Array.isArray(config.transformRequest)
            ? config.transformRequest.reduce((p, c) => c(p, config.headers), config.data)
            : config.transformRequest(config.data, config.headers)
          : config.data;
      },
      params: config.paramsSerializer ? config.paramsSerializer(config.params) : config.params,
    });
  }

  // 响应阶段获取具有相同config的请求的唯一值，作为区分不同请求的key
  getKeyFromResponse(config: AxiosRequestConfig) {
    return JSON.stringify({
      ...config,
      headers: undefined,
    });
  }

  // 获取一类请求的key，用于保存这类请求的option。
  getTypeKey(url: string, method: AxiosRequestConfig['method']) {
    return `${method}:${url}`;
  }

  post<T>(url: string, data?: any, option?: HttpOption, config?: AxiosRequestConfig) {
    this.optionList[this.getTypeKey(url, 'post')] = option;

    return this.request.post<T>(url, data, config);
  }
}

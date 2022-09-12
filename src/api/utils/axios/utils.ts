import { Message } from '@alifd/next';
import { AxiosResponse } from 'axios';
import Qs from 'qs';

// 网络错误
export const networkErrMap: any = {
  // 200: '服务器成功返回请求的数据',
  // 201: '新建或修改数据成功',
  // 202: '一个请求已经进入后台排队（异步任务）',
  // 204: '删除数据成功',
  400: '请求错误，没有新建或修改操作', // token 失效
  401: '用户没有权限',
  403: '用户已授权，但是被禁止访问',
  404: '请求错误，未找到该资源',
  405: '请求方法未允许',
  406: '请求的格式不可得',
  408: '请求超时',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
};

// generateReqKey ：用于根据当前请求的信息，生成请求 Key；
export function generateReqKey(config) {
  if (config && config.data && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data);
  }
  const { method, url, params, data } = config; // 请求方式、参数、请求地址

  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&'); // 拼接
}

// 判断一个字符串是否为JSON字符串
export let isJsonStr = (str: string) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(`error：${str}!!!${e}`);

      return false;
    }
  }

  return false;
};

// 自定义请求头
export const handleConfigureRequestHeader = (config) => {
  // config['xxxx'] = 'xxx';

  return config;
};

// 增加$_isFormData区分post请求：FormData方式
export const handleConfigureFormData = (config: any) => {
  if (config?.data.$_isFormData === true) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return config;
};

// token请求头传递
export const handleConfigureAuth = (config) => {
  if (config.data.token) {
    config.headers.common['token'] = config.data.token;
    delete config.data.token;
  }

  return config;
};

export const handleNetworkError = (errStatus?: number, response?: AxiosResponse): void => {
  if (errStatus) {
    Message.show({
      title: '响应失败',
      content: networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`,
      type: 'error',
    });

    return;
  }

  Message.show({
    title: '响应失败',
    content: response?.data.msg || '服务器响应异常，请联系管理员',
    type: 'error',
  });
};

export const handleAuthError = (msg?: string): void => {
  Message.show({
    title: '认证异常',
    content: msg || '暂无权限，请联系管理员',
    type: 'error',
  });
};

export const handleDefaultError = (msg?: string): void => {
  Message.show({
    title: '响应失败',
    content: msg || '服务器响应异常，请联系管理员',
    type: 'error',
  });
};

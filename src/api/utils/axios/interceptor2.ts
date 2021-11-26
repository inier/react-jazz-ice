import axios, { CancelTokenSource, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'; // 此处引入axios官方文件
import { Message } from '@alifd/next';
import { cacheAdapterEnhancer, throttleAdapterEnhancer, retryAdapterEnhancer } from 'axios-extensions';
import LRUCache from 'lru-cache';

const defaultAdapter = axios.defaults.adapter;
const cacheCfg = new LRUCache({
  maxAge: 1000 * 10, // 有效期10s
  max: 1000, // 最大缓存数量
});

// 返回结果处理
// 自定义约定接口返回{result: xxx, data: xxx, total:"", msg:'err message'}
const responseHandle = {
  200: (response) => {
    return response.data;
  },
  401: (response) => {
    Message.show({
      title: '认证异常',
      content: '登录状态已过期，请重新登录！',
      type: 'error',
    });

    window.location.href = window.location.origin;
  },
  default: (response) => {
    Message.show({
      title: '操作失败',
      content: response.data.msg,
      type: 'error',
    });
    return Promise.reject(response);
  },
};

const service = axios.create({
  timeout: 50000,
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(retryAdapterEnhancer(defaultAdapter), {
      enabledByDefault: false,
      cacheFlag: 'useCache',
      defaultCache: cacheCfg,
    }),
    { threshold: 4000 },
  ),
});

// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return responseHandle[response.status || 'default'](response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;

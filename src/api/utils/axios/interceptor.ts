import axios, { CancelTokenSource, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'; // 此处引入axios官方文件
import { cacheAdapterEnhancer, throttleAdapterEnhancer, retryAdapterEnhancer } from 'axios-extensions';
import { addPendingRequest, removePendingRequest } from './cancelRepeatRequest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import { requestInterceptor as cacheReqInterceptor, responseInterceptor as cacheResInterceptor } from './requestCache';
import { Message } from '@alifd/next';
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
  ),
});

// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // pending 中的请求，后续请求不发送（由于存放的pendingMap 的key 和参数有关，所以放在参数处理之后）
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    // 请求缓存
    cacheReqInterceptor(config, service);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应正常时从pendingRequest对象中移除请求
    removePendingRequest(response);
    cacheResInterceptor(response);

    return responseHandle[response.status || 'default'](response);
  },
  (error: AxiosError) => {
    // 从pending 列表中移除请求
    removePendingRequest(error.config || {});

    // 需要特殊处理请求被取消的情况
    if (!axios.isCancel(error)) {
      // 请求重发
      againRequest(error, service);
    }
    // 请求缓存处理方式
    if (axios.isCancel(error) && error.message?.data && error.message?.data?.config.cache) {
      return Promise.resolve(error.message?.data?.data); // 返回结果数据
    }

    return Promise.reject(error);
  },
);

export default service;

import { Message } from '@alifd/next';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'; // 此处引入axios官方文件

import { addPendingRequest, removePendingRequest } from './cancelRepeatRequest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import { requestInterceptor as cacheReqInterceptor, responseInterceptor as cacheResInterceptor } from './requestCache';
import { IOptions } from './type';

// 返回结果处理
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

// 创建axios的实例
const service = axios.create({
  timeout: 50000,
});

// 设置post请求头
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
service.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig | IOptions) => {
    // pending 中的请求，后续请求不发送
    // 把当前请求信息添加到pendingRequest对象中
    addPendingRequest(config);
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
  (error) => {
    // 从pending 列表中移除请求
    removePendingRequest(error.config || {});

    // 需要特殊处理请求被取消的情况
    if (!axios.isCancel(error)) {
      // 请求重发
      againRequest(error, service);
    }

    // 请求缓存处理方式
    if (axios.isCancel(error) && error.message?.data && error.message?.data?.config.cache) {
      // 返回结果数据
      return Promise.resolve(error.message?.data?.data);
    }

    return Promise.reject(error);
  },
);

export default service;

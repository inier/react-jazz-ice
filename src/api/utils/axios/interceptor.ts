import axios, { AxiosResponse, AxiosRequestConfig, IOptions } from 'axios'; // 此处引入axios官方文件

import { goToLoginWithRedirect } from '@/utils';

import { addPendingRequest, removePendingRequest } from './cancelRepeatRequest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import { requestInterceptor as cacheReqInterceptor, responseInterceptor as cacheResInterceptor } from './requestCache';
import {
  handleConfigureRequestHeader,
  handleConfigureFormData,
  handleConfigureAuth,
  handleNetworkError,
  handleAuthError,
  handleDefaultError,
} from './utils';

// 返回结果处理
const handleResponse = (status: number, response: AxiosResponse) => {
  switch (status) {
    case 200: {
      return response.data;
    }
    case 401: {
      handleAuthError();
      goToLoginWithRedirect();

      return Promise.reject(response);
    }
    default: {
      handleDefaultError(response.data.msg);

      return Promise.reject(response);
    }
  }
};

// 创建axios的实例
const service = axios.create({
  timeout: 50000,
});

// 设置post请求头
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig & IOptions) => {
    // 统一处理
    handleConfigureRequestHeader(config);
    if (config.data && config.headers) {
      // 增加$_isFormData区分post请求：FormData方式
      handleConfigureFormData(config);
      // token请求头传递
      handleConfigureAuth(config);
    }

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
    // 响应正常时，从pendingRequest对象中移除请求
    removePendingRequest(response);
    // 缓存请求处理
    cacheResInterceptor(response);

    return handleResponse(response.status, response);
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

    return handleNetworkError(error.response.status, error.response);
  },
);

export default service;

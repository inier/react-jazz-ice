import React from 'react';
import { runApp, IAppConfig, request } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import ErrorBoundaryFallback from '@/components/ErrorBoundary/ErrorBoundaryFallback';
import { getLocale } from '@/utils/locale';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from '@/stores';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

const locale = getLocale();
let cancel;

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>
        <Provider {...stores}>{children}</Provider>
      </LocaleProvider>
    ),
    // 是否开启 ErrorBoundary，默认为 false
    errorBoundary: true,
    // 自定义错误边界的 fallback UI
    ErrorBoundaryFallback: (err, componentStack) => (
      <ErrorBoundaryFallback componentStack={componentStack} error={err} />
    ),
  },
  router: {
    type: 'browser',
    basename: PUBLIC_URL, // 暂不支持，process.env.PUBLIC_URL
    // fallback: <></>, // 组件加载动画
  },
  request: {
    // 拦截器
    interceptors: {
      request: {
        onConfig: (config) => {
          console.log('request loading...');
          // 发送请求前：可以对 RequestConfig 做一些统一处理
          return config;
        },
        onError: (error) => {
          console.log('request loading... err');
          return Promise.reject(error);
        },
      },
      response: {
        onConfig: (response) => {
          console.log('request loaded success');

          return response;
        },
        onError: (error) => {
          console.log('request loaded err');
          // 请求出错：服务端返回错误状态码
          console.log(error.response?.data);
          console.log(error.response?.status);
          console.log(error.response?.headers);

          // 把错误继续向下传递
          return Promise.reject(error);
        },
      },
    },
  },
};

runApp(appConfig);

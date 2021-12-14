import React from 'react';
import { runApp, IAppConfig } from 'ice';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import ErrorBoundaryFallback from '@/components/ErrorBoundary/ErrorBoundaryFallback';
import LocaleProvider from '@/components/LocaleProvider';
import stores, { StoresContext } from '@/stores';
import { getLocale } from '@/utils/locale';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

const locale = getLocale();

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>
        <Provider {...stores}>
          {/* 服务函数组件 */}
          <StoresContext.Provider value={{ ...stores }}>{children}</StoresContext.Provider>
        </Provider>
      </LocaleProvider>
    ),
    // 是否开启 ErrorBoundary，默认为 false
    errorBoundary: true,
    // 自定义错误边界的 fallback UI
    ErrorBoundaryFallback,
  },
  router: {
    type: 'browser',
    basename: PUBLIC_URL, // 暂不支持，process.env.PUBLIC_URL
    // fallback: <></>, // 组件加载动画
  },
};

runApp(appConfig);

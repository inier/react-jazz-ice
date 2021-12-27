import React from 'react';

import { Loading } from '@alifd/next';
import { runApp, IAppConfig } from 'ice';
import { configure } from 'mobx';

// import requestConfig from '@/api/request';
import AppProvider from '@/components/AppProvider';
import ErrorBoundaryFallback from '@/components/ErrorBoundary/ErrorBoundaryFallback';
import { KeepAliveWrapper } from '@/components/RouteTabs';
import { mainRoutesConfig } from '@/routes';
import { getLocale, mapTree } from '@/utils';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
  isolateGlobalState: true,
});

const locale = getLocale();

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => <AppProvider locale={locale}>{children}</AppProvider>,
    getInitialData: async () => {
      return {
        routes: mainRoutesConfig,
      };
    },
    // 是否开启 ErrorBoundary，默认为 false
    errorBoundary: true,
    // 自定义错误边界的 fallback UI
    ErrorBoundaryFallback,
  },
  // request: requestConfig,
  router: {
    type: 'browser',
    basename: PUBLIC_URL, // 暂不支持，process.env.PUBLIC_URL
    fallback: <Loading style={{ display: 'block', flex: 1, marginTop: '-10%' }} />, // 组件加载动画
    modifyRoutes: (routes) => {
      return mapTree(routes, (node) => {
        const newNode = { ...node };
        newNode.pageConfig = newNode.pageConfig || {};
        if (node.pageConfig?.title && node.path && node.component) {
          newNode.wrappers = [KeepAliveWrapper];
        }
        return newNode;
      });
    },
  },
};

runApp(appConfig);

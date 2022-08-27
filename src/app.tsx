import React from 'react';

import { Loading } from '@alifd/next';
import { runApp, IAppConfig } from 'ice';
import { configure } from 'mobx';
import { autoFixContext } from 'react-activation';
import JSXDevRunTime from 'react/jsx-dev-runtime';
import JSXRunTime from 'react/jsx-runtime';

// import requestConfig from '@/api/requestConfig';
import AppProvider from '@/components/AppProvider';
import ErrorBoundaryFallback from '@/components/ErrorBoundary/ErrorBoundaryFallback';
import { KeepAliveWrapper } from '@/components/RouteTabs';
import { mainRoutesConfig, getFlatRoutes } from '@/routes';
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
    rootId: 'root',
    addProvider: ({ children }) => <AppProvider locale={locale}>{children}</AppProvider>,
    getInitialData: async () => {
      // todo: 权限限制逻辑
      return {
        routes: mainRoutesConfig,
        flatRoutes: getFlatRoutes(mainRoutesConfig),
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

        const { keepAlive, title } = newNode.pageConfig;
        if (keepAlive === true && title && node.path && node.component) {
          newNode.wrappers = [KeepAliveWrapper];
        }

        return newNode;
      });
    },
  },
};

autoFixContext(
  // eslint-disable-next-line global-require
  [JSXRunTime, 'jsx', 'jsxs', 'jsxDEV'],
  // eslint-disable-next-line global-require
  // @ts-ignore
  [JSXDevRunTime, 'jsx', 'jsxs', 'jsxDEV'],
);

runApp(appConfig);

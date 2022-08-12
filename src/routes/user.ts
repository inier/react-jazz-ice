import { lazy } from 'react';

import { ICustomRouterConfig } from './typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: 'login',
    exact: true,
    component: lazy(() => import('@/pages/Login')),
    pageConfig: {
      title: '登录',
    },
  },
];

export default routesConfig;

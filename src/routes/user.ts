import { lazy } from 'react';

import { Register } from '@/pages';

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
  {
    path: 'register',
    exact: true,
    component: Register,
    pageConfig: {
      title: '注册',
    },
  },
  {
    path: 'center',
    exact: true,
    component: lazy(() => import('@/pages/Demo/User/UserCenter')),
    pageConfig: {
      title: '个人中心',
      keepAlive: false,
    },
  },
];

export default routesConfig;

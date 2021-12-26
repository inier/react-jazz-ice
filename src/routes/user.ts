import { lazy } from 'react';

import UserLayout from '@/layouts/UserLayout';
import { Register } from '@/pages';

import { ICustomRouterConfig } from './typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: '/user',
    redirect: 'login',
    pageConfig: {
      icon: 'account',
      title: '用户',
    },
    component: UserLayout,
    children: [
      {
        exact: true,
        path: 'login',
        component: lazy(() => import('@/pages/Login')),
        pageConfig: {
          title: '登录',
        },
      },
      {
        path: 'register',
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
    ],
  },
];

export default routesConfig;

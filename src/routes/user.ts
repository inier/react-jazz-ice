import { lazy } from 'react';

import UserLayout from '@/layouts/UserLayout';
import { Register } from '@/pages';

import { ICustomRouterConfig } from './typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: '/user',
    redirect: '/user/login',
    pageConfig: {
      icon: 'account',
      title: '登录&注册',
    },
    component: UserLayout,
    children: [
      {
        exact: true,
        path: '/login',
        component: lazy(() => import('@/pages/Login')),
        pageConfig: {
          title: '登录',
        },
      },
      {
        path: '/register',
        component: Register,
        pageConfig: {
          title: '注册',
        },
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
];

export default routesConfig;

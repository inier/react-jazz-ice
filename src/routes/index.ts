import { lazy } from 'react';

import NotFound from '@/components/NotFound';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import { Demo, Register, subRouterConfig } from '@/pages';

import testRoutesConfig from './test';
import { ICustomRouterConfig } from './typing';

/**
 * 对 pageConfig 做了扩展, 使其兼容 proLayout menus 的配置和 RouteTabs 组件 . 侧边栏菜单的配置基于 mainRoutesConfig 生成
 */

/** 主要的路由 */
export const mainRoutesConfig: ICustomRouterConfig[] = [
  {
    path: '/home',
    exact: true,
    component: lazy(() => import('@/pages/Home')),
    pageConfig: {
      title: '首页',
      icon: 'icon-FunctionsIconForWork_Nav_Home',
      fixed: true,
    },
  },
  {
    path: '/demo',
    component: Demo,
    pageConfig: {
      title: '示例',
    },
  },
  ...subRouterConfig,
  ...testRoutesConfig,
];

const routerConfig: ICustomRouterConfig[] = [
  {
    path: '/user',
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
  {
    path: '/',
    component: BasicLayout,
    children: mainRoutesConfig,
  },
  {
    component: NotFound,
    pageConfig: {
      title: '404',
    },
  },
];

export default routerConfig;

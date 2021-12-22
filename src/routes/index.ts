import { lazy } from 'react';

import NotFound from '@/components/NotFound';
import BasicLayout from '@/layouts/BasicLayout';

import demoRoutesConfig from './demo';
import { ICustomRouterConfig } from './typing';
import userRoutesConfig from './user';

/**
 * 对 pageConfig 做了扩展, 使其兼容 proLayout menus 的配置和 RouteTabs 组件 . 侧边栏菜单的配置基于 mainRoutesConfig 生成
 */

/** 主要的路由 */
export const mainRoutesConfig: ICustomRouterConfig[] = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@/pages/Home')),
    pageConfig: {
      title: '首页',
      // icon: 'dashboard',
      fixed: true,
    },
  },
  ...demoRoutesConfig,
];

const routerConfig: ICustomRouterConfig[] = [
  ...userRoutesConfig,
  {
    path: '/',
    component: BasicLayout,
    children: mainRoutesConfig,
  },
  {
    path: '/404',
    exact: true,
    component: NotFound,
    pageConfig: {
      title: '404',
    },
  },
];

export default routerConfig;

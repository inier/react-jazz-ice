import { lazy } from 'react';

import NotFound from '@/components/NotFound';
import BasicLayout from '@/layouts/BasicLayout';

import demoRoutesConfig from './demo';
import { ICustomRouterConfig } from './typing';
import userRoutesConfig from './user';

// 格式化层级Routes
export { formatRoutes } from './utils/formatRoutes';

/**
 * 扩展 pageConfig, 使其兼容 menus 配置(@alifd/next menu组件、antd proLayout等 )和 RouteTabs 组件.
 * 侧边栏菜单的配置基于 mainRoutesConfig 生成
 */

/** 主要的路由 */
export const mainRoutesConfig: ICustomRouterConfig[] = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@/pages/Home')),
    pageConfig: {
      icon: 'favorites-filling',
      title: '首页',
      fixed: true,
      hideInMenu: true,
      keepAlive: true,
    },
  },
  {
    path: '/demo',
    pageConfig: {
      icon: 'attachment',
      title: '示例',
    },
    children: [...demoRoutesConfig],
  },
];

const routerConfig: ICustomRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: mainRoutesConfig,
  },
  ...userRoutesConfig,
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

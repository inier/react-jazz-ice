import { lazy } from 'react';

import NotFound from '@/components/NotFound';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import demoRoutesConfig from '@/pages/Demo/routes';

import { ICustomRouterConfig } from './typing';
import userRoutesConfig from './user';
import { formatRoutes, deepFlattenRoutes } from './utils/formatRoutes';

// 格式化层级Routes
export { formatRoutes, deepFlattenRoutes };

/**
 * 扩展 pageConfig, 使其兼容 menus 配置(@alifd/next menu组件、antd proLayout等 )和 RouteTabs 组件.
 * 侧边栏菜单的配置基于 mainRoutesConfig 生成
 */

/** 主要的路由 */
export const mainRoutesConfig: ICustomRouterConfig[] = [
  ...demoRoutesConfig,
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
];

const routerConfig: ICustomRouterConfig[] = [
  {
    path: '/404',
    exact: true,
    component: NotFound,
    pageConfig: {
      title: '404',
    },
  },
  {
    path: '/user',
    component: UserLayout,
    children: userRoutesConfig,
  },
  // '/'放在最后
  {
    path: '/',
    component: BasicLayout,
    children: mainRoutesConfig,
  },
];

export const getFlatRoutes = (routesConfig: ICustomRouterConfig[]) => {
  return deepFlattenRoutes(routesConfig, '/').filter((route: ICustomRouterConfig) => {
    return !!route.component;
  });
};

export default routerConfig;

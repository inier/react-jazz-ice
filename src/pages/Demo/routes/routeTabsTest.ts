import { lazy } from 'react';

import { ICustomRouterConfig } from '@/routes/typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: 'testRouteTabs',
    redirect: 'index',
    pageConfig: {
      icon: 'icon-tag',
      title: 'RouteTabs示例',
    },
    children: [
      {
        path: 'index',
        exact: true,
        pageConfig: {
          title: '列表测试页面',
        },
        component: lazy(() => import('@/pages/Demo/UI/DemoRouteTabs/index')),
      },
      {
        path: 'detail',
        exact: true,
        component: lazy(() => import('@/pages/Demo/UI/DemoRouteTabs/detail')),
        pageConfig: {
          title: '详情测试页面',
        },
      },
      {
        path: 'list',
        exact: true,
        component: lazy(() => import('@/pages/Demo/UI/DemoRouteTabs/list')),
        pageConfig: {
          title: '长列表页',
          keepAlive: true,
        },
      },
      {
        path: 'type/:type',
        exact: true,
        pageConfig: {
          title: '详情测试页面2',
          closeTips: true,
          hideInMenu: true,
        },
        component: lazy(() => import('@/pages/Demo/UI/DemoRouteTabs/type')),
      },
      {
        path: '/',
        redirect: '/404',
      },
    ],
  },
];

export default routesConfig;

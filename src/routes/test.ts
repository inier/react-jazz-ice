import { lazy } from 'react';
import { ICustomRouterConfig } from './typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: '/test',
    redirect: 'index',
    pageConfig: {
      icon: 'icon-tag',
      title: '测试选项卡使用',
    },
    children: [
      {
        path: 'index',
        exact: true,
        pageConfig: {
          title: '列表测试页面',
        },
        component: lazy(() => import('@/pages/Demo/Test/index')),
      },
      {
        path: 'detail',
        exact: true,
        component: lazy(() => import('@/pages/Demo/Test/detail')),
        pageConfig: {
          title: '详情测试页面',
        },
      },
      {
        path: 'list',
        exact: true,
        component: lazy(() => import('@/pages/Demo/Test/list')),
        pageConfig: {
          title: '长列表页',
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
        component: lazy(() => import('@/pages/Demo/Test/detail')),
      },
    ],
  },
];

export default routesConfig;

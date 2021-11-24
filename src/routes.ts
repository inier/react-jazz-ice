import { IRouterConfig } from 'ice';
import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';
import { Demo, Login, Register, subRouterConfig } from '@/pages';

const routerConfig: IRouterConfig[] = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
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
    children: [
      {
        path: '/demo',
        component: Demo,
        pageConfig: {
          title: '示例',
        },
        ...subRouterConfig,
      },
      {
        path: '/',
        // 重定向
        redirect: '/demo',
      },
    ],
  },
];

export default routerConfig;

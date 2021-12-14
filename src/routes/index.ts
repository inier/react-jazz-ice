// import { lazy } from 'react';
// import NotFound from '@/components/NotFound';
// import BasicLayout from '@/layouts/BasicLayout';
// import BlankLayout from '@/layouts/BlankLayout';
// import LoginLayout from '@/layouts/LoginLayout';
// import testRoutesConfig from './test';
// import { ICustomRouterConfig } from './typing';
// import userRoutesConfig from './user';

// /**
//  * 对 pageConfig 做了扩展, 使其兼容 proLayout menus 的配置和 PageTabs 组件 . 侧边栏菜单的配置基于 mainRoutesConfig 生成
//  */

// /** 主要的路由 */
// export const mainRoutesConfig: ICustomRouterConfig[] = [
//   {
//     path: '/',
//     exact: true,
//     component: lazy(() => import('@/pages/home')),
//     pageConfig: {
//       title: '首页',
//       icon: 'icon-FunctionsIconForWork_Nav_Home',
//       fixed: true,
//     },
//   },
//   ...userRoutesConfig,
//   ...testRoutesConfig,
// ];

// const routerConfig: ICustomRouterConfig[] = [
//   {
//     path: '/',
//     component: BlankLayout,
//     children: [
//       {
//         path: '/login',
//         component: LoginLayout,
//         children: [
//           {
//             exact: true,
//             path: '/',
//             component: lazy(() => import('@/pages/Login')),
//           },
//         ],
//       },
//       {
//         path: '/',
//         component: BasicLayout,
//         children: mainRoutesConfig,
//       },
//       {
//         component: NotFound,
//         pageConfig: {
//           title: '404',
//         },
//       },
//     ],
//   },
// ];

// export default routerConfig;

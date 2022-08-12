import { lazy } from 'react';

import demoPagesRoutesConfig from './routeDemoPages';
import testRoutesConfig from './routeTabsTest';
import { ICustomRouterConfig } from '@/routes/typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: 'demos',
    exact: true,
    component: lazy(() => import('@/pages/Demo')),
    pageConfig: {
      icon: 'attachment',
      title: '综合示例',
      keepAlive: true,
    },
  },
  ...testRoutesConfig,
  ...demoPagesRoutesConfig,
];

export default routesConfig;

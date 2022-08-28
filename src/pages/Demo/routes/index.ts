import { lazy } from 'react';

import { ICustomRouterConfig } from '@/routes/typing';
import { isDev } from '@/utils';

import demoPagesRoutesConfig from './routeDemoPages';
import testRoutesConfig from './routeTabsTest';

const routesConfig: ICustomRouterConfig[] = isDev()
  ? [
    {
      path: '/demo',
      pageConfig: {
        icon: 'attachment',
        title: '示例',
      },
      children: [
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
      ],
    },
  ]
  : [];

export default routesConfig;

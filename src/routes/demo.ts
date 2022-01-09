import { lazy } from 'react';

import {
  Workplace,
  // Analysis,
  // Monitor,
  FormBasic,
  FormTwo,
  FormThree,
  FormFour,
  FormStep,
  FormClassified,
  FormHierarchical,
  FormGroup,
  FlowGroup,
  BasicDetailPage,
  Advanced,
  BasicListPage,
  CardListPage,
  FusionFilterTable,
  FusionMultiColTable,
  FusionSingleColTable,
  FusionExpandTable,
  FusionActionTable,
  FusionMergeCellTable,
  FusionSingleTreeTable,
  FusionDialogTable,
  TableListPage,
  FeedbackFail,
  FeedbackSuccess,
  FeedbackForbidden,
  FeedbackNotFound,
  FeedbackServerError,
  Settings,
  Person,
  Demo,
  Register,
} from '@/pages';

import testRoutesConfig from './routeTabsTest';
import { ICustomRouterConfig } from './typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: 'demos',
    exact: true,
    component: Demo,
    pageConfig: {
      icon: 'attachment',
      title: '综合示例',
      keepAlive: true,
    },
  },
  ...testRoutesConfig,
  {
    path: 'dashboard',
    redirect: 'workplace',
    pageConfig: {
      icon: 'chart-pie',
      title: '数据页面',
    },
    children: [
      // {
      //   path: 'analysis',
      //   component: Analysis,
      //   pageConfig: {
      //     title: '分析页面',
      //   },
      // },
      // {
      //   path: 'monitor',
      //   component: Monitor,
      //   pageConfig: {
      //     title: '监控页面',
      //   },
      // },
      {
        path: 'workplace',
        component: Workplace,
        exact: true,
        pageConfig: {
          title: '工作台',
        },
      },
    ],
  },
  {
    path: 'form',
    redirect: 'basic',
    pageConfig: {
      icon: 'copy',
      title: '表单页面',
    },
    children: [
      {
        path: 'basic',
        component: FormBasic,
        exact: true,
        pageConfig: {
          title: '单列表单',
        },
      },
      {
        path: 'two',
        component: FormTwo,
        exact: true,
        pageConfig: {
          title: '两列表单',
        },
      },
      {
        path: 'three',
        component: FormThree,
        exact: true,
        pageConfig: {
          title: '三列表单',
        },
      },
      {
        path: 'four',
        component: FormFour,
        exact: true,
        pageConfig: {
          title: '四列表单',
        },
      },
      {
        path: 'step',
        component: FormStep,
        exact: true,
        pageConfig: {
          title: '分步表单',
        },
      },
      {
        path: 'classified',
        component: FormClassified,
        exact: true,
        pageConfig: {
          title: '分类表单',
        },
      },
      {
        path: 'group',
        component: FormGroup,
        exact: true,
        pageConfig: {
          title: '分组表单',
        },
      },
      {
        path: 'flow',
        component: FlowGroup,
        exact: true,
        pageConfig: {
          title: '流程表单',
        },
      },
      {
        path: 'hierarchical',
        component: FormHierarchical,
        exact: true,
        pageConfig: {
          title: '分级表单',
        },
      },
    ],
  },
  {
    path: 'list',
    redirect: 'basic',
    pageConfig: {
      icon: 'chart-bar',
      title: '列表页面',
    },
    children: [
      {
        path: 'basic',
        component: BasicListPage,
        exact: true,
        pageConfig: {
          title: '基础列表',
        },
      },
      {
        path: 'card',
        component: CardListPage,
        exact: true,
        pageConfig: {
          title: '卡片列表',
        },
      },
      {
        path: 'table',
        redirect: 'basic',
        pageConfig: {
          title: '表格列表',
        },
        children: [
          {
            path: 'basic',
            component: TableListPage,
            exact: true,
            pageConfig: {
              title: '基础表格列表',
            },
          },
          {
            path: 'filter',
            component: FusionFilterTable,
            exact: true,
            pageConfig: {
              title: '基础过滤',
            },
          },
          {
            path: 'singlecol',
            component: FusionSingleColTable,
            exact: true,
            pageConfig: {
              title: '单列过滤',
            },
          },
          {
            path: 'mutilcol',
            component: FusionMultiColTable,
            exact: true,
            pageConfig: {
              title: '多列过滤',
            },
          },
          {
            path: 'action',
            component: FusionActionTable,
            exact: true,
            pageConfig: {
              title: '带操作列',
            },
          },
          {
            path: 'expand',
            component: FusionExpandTable,
            exact: true,
            pageConfig: {
              title: '可展开表',
            },
          },
          {
            path: 'singletree',
            component: FusionSingleTreeTable,
            exact: true,
            pageConfig: {
              title: '单层树表',
            },
          },
          {
            path: 'dialog',
            component: FusionDialogTable,
            exact: true,
            pageConfig: {
              title: '弹窗表格',
            },
          },
          {
            path: 'mergecell',
            component: FusionMergeCellTable,
            exact: true,
            pageConfig: {
              title: '合并单元格',
            },
          },
        ],
      },
    ],
  },
  {
    path: 'detail',
    redirect: 'basic',
    pageConfig: {
      icon: 'calendar',
      title: '详情页面',
    },
    children: [
      {
        path: 'basic',
        component: BasicDetailPage,
        exact: true,
        pageConfig: {
          title: '基础详情',
        },
      },
      {
        path: 'advanced',
        component: Advanced,
        exact: true,
        pageConfig: {
          title: '高级详情',
        },
      },
    ],
  },
  {
    path: 'feedback',
    redirect: 'success',
    pageConfig: {
      icon: 'warning',
      title: '结果&缺省',
    },
    children: [
      {
        path: 'success',
        component: FeedbackSuccess,
        exact: true,
        pageConfig: {
          title: '成功页面',
        },
      },
      {
        path: 'fail',
        component: FeedbackFail,
        exact: true,
        pageConfig: {
          title: '失败页面',
        },
      },
      {
        path: '403',
        component: FeedbackForbidden,
        exact: true,
        pageConfig: {
          title: '403',
        },
      },
      {
        path: '404',
        component: FeedbackNotFound,
        exact: true,
        pageConfig: {
          title: '404',
        },
      },
      {
        path: '500',
        component: FeedbackServerError,
        exact: true,
        pageConfig: {
          title: '500',
        },
      },
    ],
  },
  {
    path: 'set',
    redirect: 'settings',
    pageConfig: {
      icon: 'set',
      title: '设置页面',
    },
    children: [
      {
        path: 'settings',
        component: Settings,
        exact: true,
        pageConfig: {
          title: '系统设置',
        },
      },
      {
        path: 'person',
        component: Person,
        exact: true,
        pageConfig: {
          title: '个人设置',
        },
      },
    ],
  },
  {
    path: 'user',
    redirect: 'login',
    pageConfig: {
      icon: 'set',
      title: '登录&注册',
    },
    children: [
      {
        path: 'login',
        component: lazy(() => import('@/pages/Login')),
        exact: true,
        pageConfig: {
          title: '登录',
        },
      },
      {
        path: 'register',
        component: Register,
        exact: true,
        pageConfig: {
          title: '注册',
        },
      },
    ],
  },
];

export default routesConfig;

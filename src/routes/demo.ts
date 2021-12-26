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

import { ICustomRouterConfig } from './typing';

const routesConfig: ICustomRouterConfig[] = [
  {
    path: '/demo',
    exact: true,
    component: Demo,
    pageConfig: {
      icon: 'attachment',
      title: '示例',
    },
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/workplace',
    pageConfig: {
      icon: 'chart-pie',
      title: '数据页面',
    },
    children: [
      // {
      //   path: '/dashboard/analysis',
      //   component: Analysis,
      //   pageConfig: {
      //     title: '分析页面',
      //   },
      // },
      // {
      //   path: '/dashboard/monitor',
      //   component: Monitor,
      //   pageConfig: {
      //     title: '监控页面',
      //   },
      // },
      {
        path: '/dashboard/workplace',
        component: Workplace,
        exact: true,
        pageConfig: {
          title: '工作台',
        },
      },
    ],
  },
  {
    path: '/form',
    redirect: '/form/basic',
    pageConfig: {
      icon: 'copy',
      title: '表单页面',
    },
    children: [
      {
        path: '/form/basic',
        component: FormBasic,
        exact: true,
        pageConfig: {
          title: '单列表单',
        },
      },
      {
        path: '/form/two',
        component: FormTwo,
        exact: true,
        pageConfig: {
          title: '两列表单',
        },
      },
      {
        path: '/form/three',
        component: FormThree,
        exact: true,
        pageConfig: {
          title: '三列表单',
        },
      },
      {
        path: '/form/four',
        component: FormFour,
        exact: true,
        pageConfig: {
          title: '四列表单',
        },
      },
      {
        path: '/form/step',
        component: FormStep,
        exact: true,
        pageConfig: {
          title: '分步表单',
        },
      },
      {
        path: '/form/classified',
        component: FormClassified,
        exact: true,
        pageConfig: {
          title: '分类表单',
        },
      },
      {
        path: '/form/group',
        component: FormGroup,
        exact: true,
        pageConfig: {
          title: '分组表单',
        },
      },
      {
        path: '/form/flow',
        component: FlowGroup,
        exact: true,
        pageConfig: {
          title: '流程表单',
        },
      },
      {
        path: '/form/hierarchical',
        component: FormHierarchical,
        exact: true,
        pageConfig: {
          title: '分级表单',
        },
      },
    ],
  },
  {
    path: '/list',
    redirect: '/list/basic',
    pageConfig: {
      icon: 'chart-bar',
      title: '列表页面',
    },
    children: [
      {
        path: '/list/basic',
        component: BasicListPage,
        exact: true,
        pageConfig: {
          title: '基础列表',
        },
      },
      {
        path: '/list/card',
        component: CardListPage,
        exact: true,
        pageConfig: {
          title: '卡片列表',
        },
      },
      {
        path: '/list/table',
        component: TableListPage,
        exact: true,
        pageConfig: {
          title: '表格列表',
        },
        children: [
          {
            path: '/list/table/filter',
            component: FusionFilterTable,
            exact: true,
            pageConfig: {
              title: '基础过滤',
            },
          },
          {
            path: '/list/table/singlecol',
            component: FusionSingleColTable,
            exact: true,
            pageConfig: {
              title: '单列过滤',
            },
          },
          {
            path: '/list/table/mutilcol',
            component: FusionMultiColTable,
            exact: true,
            pageConfig: {
              title: '多列过滤',
            },
          },
          {
            path: '/list/table/action',
            component: FusionActionTable,
            exact: true,
            pageConfig: {
              title: '带操作列',
            },
          },
          {
            path: '/list/table/expand',
            component: FusionExpandTable,
            exact: true,
            pageConfig: {
              title: '可展开表',
            },
          },
          {
            path: '/list/table/singletree',
            component: FusionSingleTreeTable,
            exact: true,
            pageConfig: {
              title: '单层树表',
            },
          },
          {
            path: '/list/table/dialog',
            component: FusionDialogTable,
            exact: true,
            pageConfig: {
              title: '弹窗表格',
            },
          },
          {
            path: '/list/table/mergecell',
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
    path: '/detail',
    redirect: '/detail/basic',
    pageConfig: {
      icon: 'calendar',
      title: '详情页面',
    },
    children: [
      {
        path: '/detail/basic',
        component: BasicDetailPage,
        exact: true,
        pageConfig: {
          title: '基础详情',
        },
      },
      {
        path: '/detail/advanced',
        component: Advanced,
        exact: true,
        pageConfig: {
          title: '高级详情',
        },
      },
    ],
  },
  {
    path: '/feedback',
    redirect: '/feedback/success',
    pageConfig: {
      icon: 'warning',
      title: '结果&缺省',
    },
    children: [
      {
        path: '/feedback/success',
        component: FeedbackSuccess,
        exact: true,
        pageConfig: {
          title: '成功页面',
        },
      },
      {
        path: '/feedback/fail',
        component: FeedbackFail,
        exact: true,
        pageConfig: {
          title: '失败页面',
        },
      },
      {
        path: '/feedback/403',
        component: FeedbackForbidden,
        exact: true,
        pageConfig: {
          title: '403',
        },
      },
      {
        path: '/feedback/404',
        component: FeedbackNotFound,
        exact: true,
        pageConfig: {
          title: '404',
        },
      },
      {
        path: '/feedback/500',
        component: FeedbackServerError,
        exact: true,
        pageConfig: {
          title: '500',
        },
      },
    ],
  },
  {
    path: '/set',
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
    path: '/user',
    redirect: '/user/login',
    pageConfig: {
      icon: 'set',
      title: '登录&注册',
    },
    children: [
      {
        path: '/user/login',
        component: lazy(() => import('@/pages/Login')),
        exact: true,
        pageConfig: {
          title: '登录',
        },
      },
      {
        path: '/user/register',
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

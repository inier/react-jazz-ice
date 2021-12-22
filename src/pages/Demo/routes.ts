import { IRouterConfig } from 'ice';
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
} from './pages';

const subRouterConfig: IRouterConfig[] = [
  // {
  //   path: '/dashboard/analysis',
  //   component: Analysis,
  // },
  // {
  //   path: '/dashboard/monitor',
  //   component: Monitor,
  // },
  {
    path: '/dashboard/workplace',
    component: Workplace,
    pageConfig: {
      title: '工作台',
    },
  },
  {
    path: '/form/basic',
    component: FormBasic,
  },
  {
    path: '/form/two',
    component: FormTwo,
  },
  {
    path: '/form/three',
    component: FormThree,
  },
  {
    path: '/form/four',
    component: FormFour,
  },
  {
    path: '/form/step',
    component: FormStep,
  },
  {
    path: '/form/classified',
    component: FormClassified,
  },
  {
    path: '/form/hierarchical',
    component: FormHierarchical,
  },
  {
    path: '/form/group',
    component: FormGroup,
  },
  {
    path: '/form/flow',
    component: FlowGroup,
  },
  {
    path: '/detail/basic',
    component: BasicDetailPage,
  },
  {
    path: '/detail/advanced',
    component: Advanced,
  },
  {
    path: '/list/basic',
    component: BasicListPage,
    pageConfig: {
      title: '基础列表',
    },
  },
  {
    path: '/list/card',
    component: CardListPage,
    pageConfig: {
      title: '卡片列表',
    },
  },
  {
    path: '/list/table/filter',
    component: FusionFilterTable,
    pageConfig: {
      title: '基础过滤',
    },
  },
  {
    path: '/list/table/mutilcol',
    component: FusionMultiColTable,
    pageConfig: {
      title: '多列过滤',
    },
  },
  {
    path: '/list/table/singlecol',
    component: FusionSingleColTable,
    pageConfig: {
      title: '单列过滤',
    },
  },
  {
    path: '/list/table/expand',
    component: FusionExpandTable,
  },
  {
    path: '/list/table/action',
    component: FusionActionTable,
  },
  {
    path: '/list/table/mergecell',
    component: FusionMergeCellTable,
  },
  {
    path: '/list/table/singletree',
    component: FusionSingleTreeTable,
  },
  {
    path: '/list/table/dialog',
    component: FusionDialogTable,
  },
  {
    path: '/list/table',
    component: TableListPage,
    pageConfig: {
      title: '表格列表',
    },
  },
  {
    path: '/feedback/fail',
    component: FeedbackFail,
  },
  {
    path: '/feedback/success',
    component: FeedbackSuccess,
  },
  {
    path: '/feedback/403',
    component: FeedbackForbidden,
  },
  {
    path: '/feedback/404',
    component: FeedbackNotFound,
  },
  {
    path: '/feedback/500',
    component: FeedbackServerError,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/person',
    component: Person,
  },
];

export default subRouterConfig;

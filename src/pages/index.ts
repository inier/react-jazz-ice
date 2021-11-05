// 页面注册
import { lazy } from 'ice';

const Login = lazy(() => import('./Login'));

export { Login };
export {
  Register,
  // Analysis,
  // Monitor,
  Solution,
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
  FusionMutilcolTable,
  FusionSinglecolTable,
  FusionExpandTable,
  FusionActionTable,
  FusionMergecellTable,
  FusionSingletreeTable,
  FusionDialogTable,
  TableListPage,
  FeedbackFail,
  FeedbackSuccess,
  FeedbackForbidden,
  FeedbackNotFound,
  FeedbackServerError,
  Workplace,
  Settings,
  Person,
} from '@/pages/demo';

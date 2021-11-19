// 页面注册
import { lazy } from 'ice';

const Login = lazy(() => import('./Login'));

export { Login };
export {
  Home,
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
  FusionMultiColTable,
  FusionSingleColTable,
  FusionExpandTable,
  FusionActionTable,
  FusionMergeCellTable,
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

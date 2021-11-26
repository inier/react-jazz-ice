// 页面注册
import { lazy } from 'ice';

const Register = lazy(() => import('./Register'));
// const Analysis = lazy(()=>import('./Analysis'));
// const Monitor = lazy(()=>import('./Monitor'));
const Workplace = lazy(() => import('./Workplace'));
const FormBasic = lazy(() => import('./FormBasic'));
const FormTwo = lazy(() => import('./FormTwo'));
const FormThree = lazy(() => import('./FormThree'));
const FormFour = lazy(() => import('./FormFour'));
const FormStep = lazy(() => import('./FormStep'));
const FormClassified = lazy(() => import('./FormClassified'));
const FormHierarchical = lazy(() => import('./FormHierarchical'));
const FormGroup = lazy(() => import('./FormGroup'));
const FlowGroup = lazy(() => import('./FlowGroup'));
const BasicDetailPage = lazy(() => import('./BasicDetailPage'));
const Advanced = lazy(() => import('./Advanced'));
const BasicListPage = lazy(() => import('./BasicListPage'));
const CardListPage = lazy(() => import('./CardListPage'));
const FusionFilterTable = lazy(() => import('./FusionFilterTable'));
const FusionMultiColTable = lazy(() => import('./FusionMultiColTable'));
const FusionSingleColTable = lazy(() => import('./FusionSingleColTable'));
const FusionExpandTable = lazy(() => import('./FusionExpandTable'));
const FusionActionTable = lazy(() => import('./FusionActionTable'));
const FusionMergeCellTable = lazy(() => import('./FusionMergeCellTable'));
const FusionSingleTreeTable = lazy(() => import('./FusionSingleTreeTable'));
const FusionDialogTable = lazy(() => import('./FusionDialogTable'));
const TableListPage = lazy(() => import('./TableListPage'));
const FeedbackFail = lazy(() => import('./FeedbackFail'));
const FeedbackSuccess = lazy(() => import('./FeedbackSuccess'));
const FeedbackForbidden = lazy(() => import('./FeedbackForbidden'));
const FeedbackNotFound = lazy(() => import('./FeedbackNotFound'));
const FeedbackServerError = lazy(() => import('./FeedbackServerError'));
const Settings = lazy(() => import('./Settings'));
const Person = lazy(() => import('./Person'));

export {
  Register,
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
  Workplace,
  Settings,
  Person,
};

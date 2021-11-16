// 页面注册
import { lazy } from '@ozo/lazy-loader';

const Register = lazy(()=>import('./Register'));
const Solution = lazy(()=>import('./Solution'));
// const Analysis = lazy(()=>import('./Analysis'));
// const Monitor = lazy(()=>import('./Monitor'));
const Workplace = lazy(()=>import('./Workplace'));
const FormBasic = lazy(()=>import('./FormBasic'));
const FormTwo = lazy(()=>import('./FormTwo'));
const FormThree = lazy(()=>import('./FormThree'));
const FormFour = lazy(()=>import('./FormFour'));
const FormStep = lazy(()=>import('./FormStep'));
const FormClassified = lazy(()=>import('./FormClassified'));
const FormHierarchical = lazy(()=>import('./FormHierarchical'));
const FormGroup = lazy(()=>import('./FormGroup'));
const FlowGroup = lazy(()=>import('./FlowGroup'));
const BasicDetailPage = lazy(()=>import('./BasicDetailPage'));
const Advanced = lazy(()=>import('./Advanced'));
const BasicListPage = lazy(()=>import('./BasicListPage'));
const CardListPage = lazy(()=>import('./CardListPage'));
const FusionFilterTable = lazy(()=>import('./FusionFilterTable'));
const FusionMutilcolTable = lazy(()=>import('./FusionMutilcolTable'));
const FusionSinglecolTable = lazy(()=>import('./FusionSinglecolTable'));
const FusionExpandTable = lazy(()=>import('./FusionExpandTable'));
const FusionActionTable = lazy(()=>import('./FusionActionTable'));
const FusionMergecellTable = lazy(()=>import('./FusionMergecellTable'));
const FusionSingletreeTable = lazy(()=>import('./FusionSingletreeTable'));
const FusionDialogTable = lazy(()=>import('./FusionDialogTable'));
const TableListPage = lazy(()=>import('./TableListPage'));
const FeedbackFail = lazy(()=>import('./FeedbackFail'));
const FeedbackSuccess = lazy(()=>import('./FeedbackSuccess'));
const FeedbackForbidden = lazy(()=>import('./FeedbackForbidden'));
const FeedbackNotFound = lazy(()=>import('./FeedbackNotFound'));
const FeedbackServerError = lazy(()=>import('./FeedbackServerError'));
const Settings = lazy(()=>import('./Settings'));
const Person = lazy(()=>import('./Person'));

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
};

// 页面注册
import { lazy } from 'ice';

const Login = lazy(() => import('./Login'));
const Demo = lazy(() => import('./Demo'));

export { Login, Demo };
export * from '@/pages/Demo/pages';
export * as subRouterConfig from './Demo/routes';

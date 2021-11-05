import renderAuthorized from './components/Authorized';
import { getAuthority } from '@/utils';

let Authorized = renderAuthorized(getAuthority()); // eslint-disable-line

// 更新权限
const reloadAuthorized = () => {
  Authorized = renderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;

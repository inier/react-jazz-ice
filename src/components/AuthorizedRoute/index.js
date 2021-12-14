import { getAuthority } from '@/utils';
import renderAuthorized from './components/Authorized';

let Authorized = renderAuthorized(getAuthority()); // eslint-disable-line

// 更新权限
const reloadAuthorized = () => {
  Authorized = renderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;

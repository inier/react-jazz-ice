/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */
import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import check from './CheckPermissions';
import Secured from './Secured';

// 每次引入组件之前调用函数传入 currentAuthorize
// 通过组件内部变量来维护 currentAuthorize
let CURRENT = 'NULL';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;

/**
 * use  authority or getAuthority
 * @param {string} currentAuthority 你的权限
 * @returns {Component}
 */
const renderAuthorize = (currentAuthority) => {
  if (currentAuthority) {
    if (currentAuthority.constructor.name === 'Function') {
      CURRENT = currentAuthority();
    }
    if (currentAuthority.constructor.name === 'String') {
      CURRENT = currentAuthority;
    }
  } else {
    CURRENT = 'NULL';
  }
  return Authorized;
};

export { CURRENT };
export default renderAuthorize;

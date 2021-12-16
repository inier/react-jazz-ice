import { Route, Redirect } from 'react-router-dom';
import { getAuthority } from '@/utils';
/**
 * @description 判断是否登录认证，未登录则跳转到登录页面
 * @param {*} { component: Component,authority,path, ...rest } authority是否已认证
 * @returns Route组件
 */
const AuthRoute = ({ component: Component, authority, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return authority && getAuthority() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location.pathname },
            }}
          />
        );
      }}
    />
  );
};
export default AuthRoute;

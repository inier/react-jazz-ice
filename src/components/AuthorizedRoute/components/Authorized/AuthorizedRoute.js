/* eslint no-confusing-arrow: 0 */
// import { Route, Redirect } from 'react-router-dom';
// import Authorized from './Authorized';
import AuthRoute from './AuthRoute';

const AuthorizedRoute = (props) => {
  const { component: Component, render, authority, redirectPath, ...rest } = props;

  return (
    // <Authorized
    //     authority={authority}
    //     noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
    // >
    //     <Route {...rest} render={(props) => (Component ? <Component {...props} /> : render(props))} />
    // </Authorized>
    <AuthRoute authority={authority} component={Component} {...rest} />
  );
};

export default AuthorizedRoute;

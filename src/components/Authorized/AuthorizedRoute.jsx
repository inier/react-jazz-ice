import React from 'react';

import { Redirect, Route } from 'umi';

import Authorized from './Authorized';

function AuthorizedRoute({ component: Component, render, authority, redirectPath, ...rest }) {
  return (
    <Authorized
      authority={authority}
      noMatch={
        <Route
          {...rest}
          render={() => (
            <Redirect
              to={{
                pathname: redirectPath,
              }}
            />
          )}
        />
      }
    >
      <Route {...rest} render={(props) => (Component ? <Component {...props} /> : render(props))} />
    </Authorized>
  );
}

export default AuthorizedRoute;

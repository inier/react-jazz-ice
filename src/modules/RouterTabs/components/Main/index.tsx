import React from 'react';

import { AppRouter, AppRoute } from '@ice/stark';
import { inject, observer } from 'mobx-react';

import NotFound from '@/components/NotFound';
import PageLoading from '@/components/PageLoading';

export default inject('UIStore')(
  /* eslint-disable prefer-arrow-callback */
  observer(function BasicPage({ setPathname, setRouteArr, UIStore }) {
    const { appRoutes } = UIStore;

    return (
      <AppRouter
        NotFoundComponent={NotFound}
        LoadingComponent={PageLoading}
        onRouteChange={(pathname) => {
          // setPathname && setPathname(pathname);
          // setRouteArr && setRouteArr(pathname);
        }}
        useShadow
      >
        {/* 应用的静态资源加载后台配置 */}
        {appRoutes.map((route) => {
          const { path, name, loadUrl } = route;
          return (
            <AppRoute
              key={path}
              path={path}
              basename={path}
              // exact
              title={name}
              url={loadUrl}
            />
          );
        })}
        {/* <AppRoute
                    path="/merchant"
                    basename="/merchant"
                    // exact
                    title="商家平台"
                    url={[
                        '//g.alicdn.com/icestark-demo/child/0.2.0/js/index.js',
                        '//g.alicdn.com/icestark-demo/child/0.2.0/css/index.css',
                    ]}
                />
                <AppRoute
                    path="/waiter"
                    basename="/waiter"
                    title="小二平台"
                    url={[
                        '//g.alicdn.com/icestark-demo/child2/0.2.1/js/index.js',
                        '//g.alicdn.com/icestark-demo/child2/0.2.1/css/index.css',
                    ]}
                /> */}
      </AppRouter>
    );
  }),
);

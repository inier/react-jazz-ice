import React from 'react';

import { observer } from 'mobx-react';
import { stringify } from 'qs';
import { Redirect } from 'react-router-dom';

import { useMobxStores } from '@/hooks';

const SecurityLayout = ({ children }) => {
  const { userStore } = useMobxStores();
  // 登录认证规则
  const isLogin = userStore.token;
  const queryString = stringify({
    redirect: window.location.href,
  });

  if (!isLogin && window.location.pathname !== '/user/login') {
    return <Redirect to={`/user/login?${queryString}`} />;
  }

  return children;
};

export default observer(SecurityLayout);

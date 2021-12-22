import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { stringify } from 'qs';
import { Redirect } from 'react-router-dom';

import PageLoading from '@/components/PageLoading';
import { useMount, useMobxStore } from '@/hooks';

const SecurityLayout = observer((props) => {
  const { userStore } = useMobxStore();
  const { getUser, userInfo } = userStore;
  const { children } = props;
  const [isReady, setIsReady] = useState(false);

  useMount(() => {
    if (!userInfo.name) {
      getUser &&
        getUser().then(() => {
          setIsReady(true);
        });
    } else {
      setIsReady(true);
    }
  });

  // You can replace it to your authentication rule (such as check token exists)
  // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
  const isLogin = userInfo;
  const queryString = stringify({
    redirect: window.location.href,
  });

  if (!isLogin || !isReady) {
    return <PageLoading />;
  }

  if (!isLogin && window.location.pathname !== '/login') {
    return <Redirect to={`/login?${queryString}`} />;
  }

  return children;
});

export default SecurityLayout;

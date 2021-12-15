import React, { useEffect } from 'react';

import { Shell, Loading, Message } from '@alifd/next';
import { observer } from 'mobx-react';

import { useMobxStore } from '@/hooks';
import RouterTabs from '@/modules/RouterTabs';

import Footer from './components/Footer';
import GlobalSearch from './components/GlobalSearch';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import Notice from './components/Notice';
import PageNav from './components/PageNav';
import SolutionLink from './components/SolutionLink';

const siteLogo = 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png';
const siteName = 'Site Name';

function BasicLayout({ location, children }) {
  const { UIStore, userStore, menuStore } = useMobxStore();
  const { loading, toastMsg } = UIStore;
  const { getUser, userInfo } = userStore;
  const { getDefaultMenuItemPath } = menuStore;
  const defaultRouteTab = getDefaultMenuItemPath(location);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Shell
      style={{
        height: '100vh',
      }}
      type="brand"
    >
      <Shell.Branding>
        <Logo image={siteLogo} text={siteName} />
      </Shell.Branding>
      <Shell.Navigation
        style={{
          marginRight: 10,
        }}
        direction="hoz"
      >
        <GlobalSearch />
      </Shell.Navigation>
      <Shell.Action>
        <Notice />
        <SolutionLink />
        <HeaderAvatar {...userInfo} />
      </Shell.Action>

      <Shell.Navigation>
        <PageNav />
      </Shell.Navigation>

      <Shell.Content>
        <Loading visible={!!loading} fullScreen />
        <Message visible={!!toastMsg}>{toastMsg}</Message>
        {/* 多标签路由 */}
        <RouterTabs value={defaultRouteTab} />
        {children}
      </Shell.Content>

      <Shell.Footer>
        <Footer />
      </Shell.Footer>
    </Shell>
  );
}

export default observer(BasicLayout);

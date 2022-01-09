import React, { useEffect } from 'react';

import { Shell, Loading, Message } from '@alifd/next';
import { observer } from 'mobx-react';

import { RouteTabs, RouteTabsProvider } from '@/components/RouteTabs';
import { useMobxStore } from '@/hooks';
import SecurityLayout from '@/layouts/SecurityLayout';

import Footer from './components/Footer';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import Notice from './components/Notice';
import PageNav from './components/PageNav';
import SolutionLink from './components/SolutionLink';
// import TopNav from './components/TopNav';
import styles from './index.module.scss';

const siteLogo = 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png';
const siteName = 'Site Name';

function BasicLayout({ children }) {
  const { UIStore, userStore } = useMobxStore();
  const { loading, toastMsg } = UIStore;
  const { userInfo } = userStore;

  return (
    <SecurityLayout>
      <RouteTabsProvider defaultTabs={['/']}>
        <Shell className={`${styles['basic-layout']}`} type="brand">
          <Shell.Branding>
            <Logo image={siteLogo} text={siteName} />
          </Shell.Branding>
          {/* <Shell.Navigation direction="hoz">
            <TopNav />
          </Shell.Navigation> */}
          <Shell.Action>
            <Notice />
            <SolutionLink />
            <HeaderAvatar {...userInfo} />
          </Shell.Action>

          <Shell.Navigation className="navigation scrollbar">
            <PageNav />
          </Shell.Navigation>

          <Shell.Content>
            <Loading visible={!!loading} fullScreen />
            <Message visible={!!toastMsg}>{toastMsg}</Message>
            {/* 多标签路由 */}
            <RouteTabs>{children}</RouteTabs>
          </Shell.Content>

          <Shell.Footer>
            <Footer />
          </Shell.Footer>
        </Shell>
      </RouteTabsProvider>
    </SecurityLayout>
  );
}
BasicLayout.displayName = 'BasicLayout';

export default observer(BasicLayout);

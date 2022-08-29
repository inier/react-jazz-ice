import React, { useEffect, useState, useRef } from 'react';

import { Shell } from '@alifd/next';
import { observer } from 'mobx-react';

// import RouteTabs from '@/modules/RouterTabs';
import { RouteTabs, RouteTabsProvider } from '@/components/RouteTabs';
import { useMobxStores } from '@/hooks';
import SecurityLayout from '@/layouts/SecurityLayout';

import AsideNav from './components/AsideNav';
import Footer from './components/Footer';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import Notice from './components/Notice';
import SolutionLink from './components/SolutionLink';
import TopNav from './components/TopNav';
import styles from './index.module.scss';

const siteLogo = 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png';
const siteName = 'Site Name';

const BasicLayout = ({ children }) => {
  const { userStore, menuStore } = useMobxStores();
  const { token } = userStore;

  useEffect(() => {
    if (token) {
      // 拉去权限菜单
      menuStore.getAdminResList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab) => {
    // 按当前菜单项反选顶部菜单
    const targetPath = menuStore.menuPaths.filter((item) => {
      return item.path === tab?.path;
    });

    if (targetPath.length && menuStore.headerMenuCurrent !== targetPath[0].topPath) {
      menuStore.setHeaderMenuCurrent(targetPath[0].topPath);
    }
  };

  return (
    <SecurityLayout>
      <RouteTabsProvider>
        <Shell className={`${styles['basic-layout']}`} type="brand">
          <Shell.Branding>
            <Logo
              image={siteLogo}
              text={siteName}
              onClick={() => {
                menuStore.setHeaderMenuCurrent();
              }}
            />
          </Shell.Branding>
          <Shell.Navigation direction="hoz">
            {/* 顶部菜单 */}
            <TopNav token={token} />
          </Shell.Navigation>
          <Shell.Action>
            <Notice />
            <SolutionLink />
            <HeaderAvatar />
          </Shell.Action>

          {menuStore.headerMenuCurrent && (
            <Shell.LocalNavigation className="navigation">
              {/* 配合顶部菜单的侧边栏菜单 */}
              <AsideNav />
              {/* 完整的侧边栏菜单 */}
              {/* <PageNav /> */}
            </Shell.LocalNavigation>
          )}

          <Shell.Content className={styles.content}>
            {/* 多标签路由 */}
            <RouteTabs onTabChange={handleTabChange}>{children}</RouteTabs>
            {/* <RouterTabs value={defaultRouteTab} routeType="route">{children}</RouterTabs> */}
          </Shell.Content>

          <Shell.Footer>
            <Footer />
          </Shell.Footer>
        </Shell>
      </RouteTabsProvider>
    </SecurityLayout>
  );
};

export default observer(BasicLayout);

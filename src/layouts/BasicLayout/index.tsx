import React, { useEffect } from 'react';

import { Shell, Loading, Message, Icon } from '@alifd/next';
import { observer } from 'mobx-react';

import { RouteTabs, RouteTabsProvider } from '@/components/RouteTabs';
import { useMobxStores } from '@/hooks';
import SecurityLayout from '@/layouts/SecurityLayout';

// import RouteTabs from '@/modules/RouterTabs';

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

const BasicLayout = ({ location, children }) => {
  const { UIStore, userStore, menuStore } = useMobxStores();
  const { loading, toastMsg } = UIStore;
  const { userInfo } = userStore;

  useEffect(() => {
    const { pathname, search } = location;

    menuStore
      .getAdminResList()
      .then((res) => {
        if (res) {
          if (search.indexOf('type=top') > -1) {
            menuStore.setHeaderMenuCurrent(pathname);
          } else if (pathname !== '/') {
            const tPathInfo = menuStore.pathValidate(pathname);
            if (tPathInfo.topPath) {
              menuStore.setHeaderMenuCurrent(tPathInfo.topPath);
            }
          }
        }
      })
      .catch(() => {
        menuStore.getAdminResList();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab) => {
    // 按当前菜单项反选顶部菜单
    const targetPath = menuStore.menuPaths.filter((item) => {
      return item.path === tab?.path;
    });

    if (targetPath[0]) {
      if (menuStore.headerMenuCurrent !== targetPath[0].topPath) {
        menuStore.setHeaderMenuCurrent(targetPath[0].topPath);
      }
      if (menuStore.asideMenuCurrent !== targetPath[0].path) {
        menuStore.setAsideMenuCurrent(targetPath[0].path);
      }
    }
  };
  // const defaultRouteTab = menuStore.getDefaultMenuItemPath(location);

  return (
    <SecurityLayout>
      <RouteTabsProvider>
        <Shell className={`${styles['basic-layout']}`} type="brand">
          <Shell.Branding>
            <Logo image={siteLogo} text={siteName} />
          </Shell.Branding>
          <Shell.Navigation direction="hoz">
            <TopNav token={UIStore.token} />
          </Shell.Navigation>
          <Shell.Action>
            <Notice />
            <SolutionLink />
            <HeaderAvatar {...userInfo} />
          </Shell.Action>

          {menuStore.asideMenuConfig.length && (
            <Shell.Navigation className="navigation scrollbar">
              <AsideNav />
            </Shell.Navigation>
          )}

          <Shell.Content>
            <Loading visible={!!loading} fullScreen />
            <Message visible={!!toastMsg}>{toastMsg}</Message>
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

import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Shell, ConfigProvider, Loading, Message } from '@alifd/next';
import RouterTabs from '@/modules/RouterTabs';
import PageNav from './components/PageNav';
import GlobalSearch from './components/GlobalSearch';
import Notice from './components/Notice';
import SolutionLink from './components/SolutionLink';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import Footer from './components/Footer';

const siteLogo = 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png';
const siteName = '长安商城门户端';

(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}
function BasicLayout({ getDefaultMenuItemPath, location, toastMsg, loading, children }) {
  const getDevice: IGetDevice = (width) => {
    const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth = (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }
  const defaultRouteTab = getDefaultMenuItemPath(location);

  return (
    <ConfigProvider device={device}>
      <Shell
        style={{
          minHeight: '100vh',
        }}
        type="brand"
        fixedHeader={false}
      >
        <Shell.Branding>
          <Logo image={siteLogo} text={siteName} />
        </Shell.Branding>
        <Shell.Navigation
          direction="hoz"
          style={{
            marginRight: 10,
          }}
        >
          <GlobalSearch />
        </Shell.Navigation>
        <Shell.Action>
          <Notice />
          <SolutionLink />
          <HeaderAvatar />
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
    </ConfigProvider>
  );
}

export default inject((stores) => ({
  loading: stores.UIStore.loading,
  toastMsg: stores.UIStore.toastMsg,
  getDefaultMenuItemPath: stores.menuStore.getDefaultMenuItemPath,
}))(observer(BasicLayout));

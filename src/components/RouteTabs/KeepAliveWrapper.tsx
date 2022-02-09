import { useLocation } from 'ice';
import { KeepAlive } from 'react-activation';

import { useRouteTabsContext } from './hooks';

const keepAliveWhenParam = [true, true];

const KeepAliveWrapper = (PageComponent) => {
  const { pageConfig = {} } = PageComponent;

  // default: disable keepAlive, set pageConfig.keepAlive true to enable KeepAlive provider
  if (pageConfig.keepAlive !== true) {
    return PageComponent;
  }

  const WrappedKeepAlive = (props) => {
    const { state } = useRouteTabsContext();
    const location = useLocation();

    if (state.currentTab?.keepAlive === false) {
      return <PageComponent key={state.currentTab?.tabId} {...props} />;
    }

    // 只有存在 currentTab, 且 currentTab 的 location.pathname 与当前的 location.pathname 相同 才允许创建页面
    const isShow =
      window.ROUTE_TABS_CHANGE_COMPLETE && state.currentTab && state.currentTab.location.pathname === location.pathname;

    if (isShow) {
      const { keepaliveId } = state.currentTab || {};

      return (
        <KeepAlive
          id={keepaliveId}
          name={keepaliveId}
          when={keepAliveWhenParam}
          saveScrollPosition=".route-tabs-content"
        >
          <PageComponent key={keepaliveId} {...props} />
        </KeepAlive>
      );
    }

    return null;
  };

  return WrappedKeepAlive;
};

export default KeepAliveWrapper;

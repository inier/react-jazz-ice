import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { Dropdown, Menu, Icon } from '@alifd/next';
import classnames from 'classnames';
import { debounce } from 'lodash-es';

import { useRouteTabsContext } from './hooks';

import './index.scss';

const TABS_BAR_PADDING = 48;

const LeftOutlined = ({ title = '返回' }) => {
  return <Icon type="arrow-left" title={title} />;
};
const RightOutlined = () => {
  return <Icon type="arrow-right" title="向右滚动" />;
};
const CloseOutlined = () => {
  return <Icon type="close" size="small" title="关闭" />;
};
const ReloadOutlined = () => {
  return <Icon type="refresh" title="刷新" />;
};

const RouteTabs = (props) => {
  const { children } = props;
  const context = useRouteTabsContext();
  const { state, action } = context || {};

  useEffect(() => {
    if (!context) {
      console.error('warning: The RouteTabs component must be under the RouteTabsContext component');
    }
  }, [context]);

  const [isShowNavControls, setIsShowNavControls] = useState(false);
  const [scrollX, setScrollX] = useState(0);

  // 设置滚动偏移量
  const handleSetScroll = (x) => {
    if (isShowNavControls) {
      const $nav = document.querySelector('.route-tabs-bar-nav');
      const $navInner = document.querySelector('.route-tabs-bar-nav-inner');

      if ($nav && $navInner) {
        const maxScroll = -(
          $navInner.getBoundingClientRect().width +
          TABS_BAR_PADDING -
          $nav.getBoundingClientRect().width
        );

        if (x >= 0) {
          setScrollX(0);
        } else if (x <= maxScroll) {
          setScrollX(maxScroll);
        } else {
          setScrollX(x);
        }
      }
    } else {
      setScrollX(0);
    }
  };

  const handleCurrentTabChange = useCallback(() => {
    if (state.currentTab) {
      const $nav = document.querySelector('.route-tabs-bar-nav');
      const $activeTabItem = document.querySelector('.route-tabs .tab-item.active');

      if ($nav && $activeTabItem) {
        const navRect = $nav?.getBoundingClientRect();
        const { width, left } = $activeTabItem?.getBoundingClientRect();

        if (navRect.left > left - TABS_BAR_PADDING) {
          // 高亮部分在左侧隐藏部分
          const x = left - scrollX - TABS_BAR_PADDING * 2 - navRect.left;
          handleSetScroll(-x);
        } else if (width + left + TABS_BAR_PADDING > navRect.width + navRect.left) {
          // 高亮部分在右侧隐藏部分
          const x = left + width - scrollX + TABS_BAR_PADDING * 2 - (navRect.width + navRect.left);
          handleSetScroll(-x);
        } else {
          // 可视区域内, tabs 的长度有变化, 要重新计算
          handleSetScroll(scrollX);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollX, state.currentTab]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoAdjust = useCallback(
    debounce((checkCurrentTab = true) => {
      const $nav = document.querySelector('.route-tabs-bar-nav');
      const $navInner = document.querySelector('.route-tabs-bar-nav-inner');

      if ($nav && $navInner) {
        if (
          $navInner?.getBoundingClientRect().width >=
          $nav?.getBoundingClientRect().width - (isShowNavControls ? TABS_BAR_PADDING : 0)
        ) {
          setIsShowNavControls(true);
        } else {
          setIsShowNavControls(false);
          setScrollX(0);
        }
      }
      if (checkCurrentTab) {
        handleCurrentTabChange();
      }
    }, 500),
    [isShowNavControls],
  );

  useLayoutEffect(() => {
    autoAdjust(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tabs]);

  useEffect(() => {
    window.addEventListener('resize', autoAdjust);
    return () => {
      window.removeEventListener('resize', autoAdjust);
    };
  }, [autoAdjust]);

  useLayoutEffect(() => {
    handleCurrentTabChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentTab]);

  const handleClick = (tab) => {
    action.openTab(tab);
  };

  const handleClose = (e, tab) => {
    e.stopPropagation();
    e.preventDefault();
    action.closeTab(tab);
  };

  const handleTabItemMenuClick = (e, tab) => {
    const { key } = e;
    switch (key) {
      case 'refresh': {
        action.refreshTab(tab);
        break;
      }
      case 'closeCurrent': {
        action.closeTab(tab);
        break;
      }
      case 'closeOther': {
        action.closeOtherTab();
        break;
      }
      case 'closeRight': {
        action.closeRightTab();
        break;
      }
      case 'closeLeft': {
        action.closeLeftTab();
        break;
      }
      default:
        break;
    }
  };

  const getTabItemMenu = (tab, index) => {
    return (
      <Menu onClick={(e) => handleTabItemMenuClick(e, tab)}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item disabled={index === 0} key="closeCurrent">
          关闭
        </Menu.Item>
        <Menu.Item disabled={state.tabs.length === 1} key="closeOther">
          关闭其他
        </Menu.Item>
        <Menu.Item disabled={state.tabs.length === index + 1} key="closeRight">
          关闭右侧
        </Menu.Item>
        <Menu.Item disabled={index <= 1} key="closeLeft">
          关闭左侧
        </Menu.Item>
      </Menu>
    );
  };

  const handleBack = () => {
    if (state.currentTab?.prevTab) {
      action.backPrevTab();
    }
  };

  const handleRefresh = () => {
    action.refreshTab();
  };

  return (
    <div className="route-tabs">
      <div className="route-tabs-bar">
        <div className="route-tabs-bar-controls">
          <a className={classnames(!state?.currentTab?.prevTab && 'disabled')}>
            <LeftOutlined disabled={!state?.currentTab?.prevTab} onClick={handleBack} />
          </a>
          <a>
            <ReloadOutlined onClick={handleRefresh} />
          </a>
        </div>
        <div className={classnames('route-tabs-bar-nav', isShowNavControls && 'show-controls')}>
          {isShowNavControls && (
            <a className="route-tabs-bar-nav-left" onClick={() => handleSetScroll(scrollX + 200)}>
              <LeftOutlined />
            </a>
          )}
          {isShowNavControls && (
            <a className="route-tabs-bar-nav-right" onClick={() => handleSetScroll(scrollX - 200)}>
              <RightOutlined />
            </a>
          )}
          <ul className="route-tabs-bar-nav-inner" style={{ transform: `translateX(${scrollX}px)` }}>
            {state.tabs.map((tab, index) => {
              return (
                <li
                  key={tab.id}
                  onClick={() => handleClick(tab)}
                  onContextMenu={(e) => e.preventDefault()}
                  className={classnames('tab-item', {
                    active: tab.id === state.currentTab?.id,
                  })}
                >
                  <div className="tab-item-inner">
                    {tab.icon && <Icon type={tab.icon} size="small" className="tab-item-icon" />}
                    <span className="tab-item-name" title={tab.name}>
                      {tab.name}
                    </span>
                    {!tab.fixed && (
                      <Dropdown
                        trigger={
                          <span className="tab-item-close" onClick={(e) => handleClose(e, tab)}>
                            <CloseOutlined />
                          </span>
                        }
                      >
                        {getTabItemMenu(tab, index)}
                      </Dropdown>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="route-tabs-content scrollbar">{children}</div>
    </div>
  );
};

RouteTabs.propTypes = {};

RouteTabs.defaultProps = {};

RouteTabs.displayName = 'RouteTabs';

export default memo(RouteTabs);

import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';

import classnames from 'classnames';
import { debounce } from 'lodash-es';
import PropTypes from 'prop-types';

import { useRouteTabsContext } from './hooks';
import { LeftOutlined, RightOutlined, ReloadOutlined } from './Icon';
import TagContextMenu from './TagContextMenu';

import './index.scss';

const TABS_BAR_PADDING = 80;

const RouteTabs = (props) => {
  const { onTabChange, children } = props;
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
    onTabChange && onTabChange(state.currentTab);
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

  const handleBack = () => {
    if (state.currentTab?.prevTab) {
      action.backPrevTab(state.currentTab);
    }
  };

  const handleRefresh = () => {
    action.refreshTab();
  };

  if (!state.tabs.length) {
    return null;
  }

  return (
    <div className={classnames('route-tabs', props.type === 'classic' && 'classic')}>
      <div className="route-tabs-bar">
        {props.controls && (
          <div className="route-tabs-bar-controls">
            <a className={classnames(!state?.currentTab?.prevTab && 'disabled')}>
              <LeftOutlined disabled={!state?.currentTab?.prevTab} onClick={handleBack} />
            </a>
            <a>
              <ReloadOutlined onClick={handleRefresh} />
            </a>
          </div>
        )}
        <div className={classnames('route-tabs-bar-nav', isShowNavControls && 'show-controls')}>
          {isShowNavControls && (
            <a className="route-tabs-bar-nav-left" onClick={() => handleSetScroll(scrollX + 300)}>
              <LeftOutlined />
            </a>
          )}
          {isShowNavControls && (
            <a className="route-tabs-bar-nav-right" onClick={() => handleSetScroll(scrollX - 300)}>
              <RightOutlined />
            </a>
          )}
          <div className="route-tabs-bar-nav-inner" style={{ transform: `translateX(${scrollX}px)` }}>
            {state.tabs.map((tab, index) => {
              return (
                <TagContextMenu
                  key={tab.tabId}
                  index={index}
                  tab={tab}
                  currentTab={state.currentTab}
                  isShowNavControls={isShowNavControls}
                  length={state.tabs.length}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="route-tabs-content scrollbar">{children}</div>
    </div>
  );
};

RouteTabs.propTypes = {
  type: PropTypes.oneOf(['classic', 'fusion']),
  controls: PropTypes.bool,
  onTabChange: PropTypes.func,
  children: PropTypes.node,
};

RouteTabs.defaultProps = {
  type: 'fusion',
  controls: false,
  onTabChange: null,
};

RouteTabs.displayName = 'RouteTabs';

export default memo(RouteTabs);

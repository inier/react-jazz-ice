import React, { memo, useCallback } from 'react';

import { Menu, Icon } from '@alifd/next';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useRouteTabsContext } from '@/hooks';

import Tag from './Tag';

import './index.scss';

const CloseOutlined = ({ title = '关闭', ...restProps }) => {
  return <Icon type="close" size="small" title={title} {...restProps} />;
};

const Tab = (props) => {
  const { tab, currentTab, index, contextMenu, isShowNavControls, children } = props;
  const { action } = useRouteTabsContext();

  const handleClick = useCallback(
    (cTab) => {
      if (cTab.path === currentTab.path) {
        return;
      }
      action.openTab(cTab);
    },
    [action],
  );

  const handleClose = useCallback(
    (cTab, e) => {
      e?.stopPropagation();
      e?.preventDefault();
      action.closeTab(cTab);
    },
    [action],
  );

  const handleTabItemMenuClick = (key, cTab) => {
    switch (key) {
      case 'refresh': {
        action.refreshTab(cTab);
        break;
      }
      case 'closeCurrent': {
        action.closeTab(cTab);
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
      case 'closeAll': {
        action.closeAllTab();
        break;
      }
      default:
        break;
    }
  };

  // 创建右键菜单
  const createTabItemContextMenu = (e, cTab, cIndex) => {
    e.preventDefault();

    const { target } = e;
    const { top, left } = target.getBoundingClientRect();
    const { length } = props;

    Menu.create({
      target: e.target,
      offset: [e.clientX - left, e.clientY - top],
      className: 'tabs-item-context-menu',
      popupClassName: 'tabs-item-context-menu',
      onItemClick: (key) => handleTabItemMenuClick(key, cTab),
      children: [
        cTab?.pageConfig.keepAlive && <Menu.Item key="refresh">刷新</Menu.Item>,
        <Menu.Item disabled={cIndex === 0} key="closeCurrent">
          关闭
        </Menu.Item>,
        <Menu.Item disabled={length === 2} key="closeOther">
          关闭其他标签
        </Menu.Item>,
        <Menu.Item disabled={length === +cIndex + 1} key="closeRight">
          关闭右侧标签
        </Menu.Item>,
        <Menu.Item disabled={cIndex <= 1} key="closeLeft">
          关闭左侧标签
        </Menu.Item>,
        <Menu.Item disabled={length <= 1} key="closeAll">
          关闭所有标签
        </Menu.Item>,
      ],
    });
  };

  return (
    <div onClick={() => handleClick(tab)} onContextMenu={(e) => e.preventDefault()}>
      <div
        onContextMenu={(e) => {
          // 禁用右键菜单时
          if (!contextMenu) {
            return;
          }
          if (tab.tabId === currentTab?.tabId) {
            createTabItemContextMenu(e, tab, index);
          }
        }}
      >
        {children || (
          <Tag
            title={tab.name}
            value={tab}
            isEllipsis={isShowNavControls}
            isClose={index !== 0 && tab.path === currentTab.path}
            isActive={tab.path === currentTab.path}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

Tab.propTypes = {
  /**
   * 禁用右键菜单
   */
  contextMenu: PropTypes.bool,
};
Tab.defaultProps = { contextMenu: true };
Tab.displayName = 'TabItem';

export default memo(Tab);

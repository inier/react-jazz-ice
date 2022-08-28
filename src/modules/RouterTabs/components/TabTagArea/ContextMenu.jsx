import React, { memo } from 'react';

import { Menu } from '@alifd/next';
import PropTypes from 'prop-types';

const Tab = observer((props)                     => {
  const { isActive, index, contextMenu, handleTabItemMenuClick, children } = props;

  // 创建右键菜单
  const createTabItemContextMenu = (e, cIndex) => {
    e.preventDefault();

    const { target } = e;
    const { top, left } = target.getBoundingClientRect();
    const { length } = props;

    Menu.create({
      target: e.target,
      offset: [e.clientX - left, e.clientY - top],
      className: 'tabs-item-context-menu',
      popupClassName: 'tabs-item-context-menu',
      onItemClick: (key) => handleTabItemMenuClick(key),
      children: [
        // <Menu.Item key="3">刷新</Menu.Item>,
        <Menu.Item disabled={cIndex === 0} key="6">
          关闭
        </Menu.Item>,
        <Menu.Item disabled={length === 2} key="2">
          关闭其他标签
        </Menu.Item>,
        <Menu.Item disabled={length === +cIndex + 1} key="5">
          关闭右侧标签
        </Menu.Item>,
        <Menu.Item disabled={cIndex <= 1} key="4">
          关闭左侧标签
        </Menu.Item>,
        <Menu.Item disabled={length <= 1} key="1">
          关闭所有标签
        </Menu.Item>,
      ],
    });
  };

  return (
    <div style={{ display: 'inline-block' }} onContextMenu={(e) => e.preventDefault()}>
      <div
        onContextMenu={(e) => {
          // 禁用右键菜单时
          if (!contextMenu) {
            return;
          }
          if (isActive) {
            createTabItemContextMenu(e, index);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
});

Tab.propTypes = {
  /**
   * 禁用右键菜单
   */
  contextMenu: PropTypes.bool,
};
Tab.defaultProps = { contextMenu: true };
Tab.displayName = 'TabItem';

export default memo(Tab);

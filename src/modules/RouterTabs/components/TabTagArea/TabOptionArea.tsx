import React from 'react';

import { Tag, Dropdown, Icon, Menu } from '@alifd/next';

import styles from './index.module.scss';

const { SubMenu } = Menu;

// Tab标签操作区
const TabOptionArea = ({ tags, onClick })                     => {
  return (
    <div className={`${styles['router-tabs-options']}`}>
      <Dropdown
        trigger={
          <Tag size="large">
            <Icon type="arrow-down" />
          </Tag>
        }
        triggerType="click"
      >
        <Menu onItemClick={onClick}>
          <Menu.Item key="1">关闭所有标签</Menu.Item>
          <Menu.Item key="2">关闭其他标签</Menu.Item>
          {/* <Menu.Item key="3">刷新当前标签</Menu.Item> */}
          <SubMenu key="tag-sub-menu" label="切换到标签" mode="popup">
            {tags.map((item) => (
              <Menu.Item key={item.key}>{item.props.title}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default TabOptionArea;

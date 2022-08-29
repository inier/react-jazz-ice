import React from 'react';

import { Tag, Dropdown, Icon, Balloon, Menu } from '@alifd/next';
import classNames from 'classnames';

import styles from './index.module.scss';

const { Tooltip } = Balloon;
const { SubMenu } = Menu;
const { Closeable: CloseableTag } = Tag;

interface IProps {
  panes: string[];
  activeKey: string;
  initTitle?: string;
  handleClick: (tag, e?) => void;
  handleClose: (tag) => void;
  handleMenuClick: (e) => void;
  getTitleByPathname: (tag) => object;
  className?: string;
  style?: object;
}

// Tab标签区
const TabTagArea: React.FC<IProps> = ({
  panes,
  activeKey,
  initTitle,
  handleClick,
  handleClose,
  handleMenuClick,
  className,
  style,
  getTitleByPathname,
}) => {
  const cls = classNames(styles['router-tabs-tags'], className);
  const tags = panes.map((pathname, index) => {
    // 通过pathname获取到指定的页面名称
    const routeInfo: any = getTitleByPathname(pathname);
    const title = routeInfo?.name || initTitle;
    const isLongTag = title.length > 8; // title超过8个字符的标记

    const tagElem = () => {
      const props = {
        key: pathname,
        'data-key': pathname,
        className: classNames(styles.tag, { [styles.active]: pathname === activeKey }),
        onClick: (e) => handleClick(pathname, e),
      };
      const Child = (
        <>
          {/* 小蓝点，高亮显示 */}
          <span className={styles.icon} />
          {/* title 超过8个字符的处理 */}
          {isLongTag ? `${title.slice(0, 8)}...` : title}
        </>
      );
      let content = <Tag {...props}>{Child}</Tag>;
      if (index !== 0) {
        content = (
          <CloseableTag {...props} afterClose={() => handleClose(pathname)}>
            {Child}
          </CloseableTag>
        );
      }

      return content;
    };

    /* title 超过8个字符的处理 */
    return isLongTag ? (
      <Tooltip key={`tooltip_${pathname}`} trigger={tagElem} align="b">
        {title}
      </Tooltip>
    ) : (
      tagElem
    );
  });

  return (
    <div className={cls} style={{ ...style }}>
      {/* tabs的tags容器 */}
      <div className={`${styles['router-tabs-tags-box']}`}>
        <div className={`${styles['router-tabs-tags-cont']}`}>{tags}</div>
      </div>
      {/* 快捷功能 */}
      <TabOptionArea tags={tags} handleClick={handleMenuClick} />
    </div>
  );
};

// Tab标签操作区
const TabOptionArea = ({ tags, handleClick }) => {
  return (
    <div className={`${styles['router-tabs-options']}`}>
      <Dropdown
        trigger={
          <Tag size={'small'} color="#2d8cf0" style={{ margin: '0 12px' }}>
            标签选项 <Icon size="xxs" type="arrow-down" />
          </Tag>
        }
        triggerType="click"
      >
        <Menu onItemClick={handleClick}>
          <Menu.Item key="1">关闭所有标签</Menu.Item>
          <Menu.Item key="2">关闭其他标签</Menu.Item>
          <Menu.Item key="3">刷新当前标签</Menu.Item>
          <SubMenu key="tag-sub-menu" label="切换到标签" mode="popup">
            {tags.map((item) => (
              <Menu.Item key={item.key}>{item.props.children}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default TabTagArea;

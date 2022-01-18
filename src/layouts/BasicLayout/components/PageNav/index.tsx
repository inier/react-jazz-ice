import React, { useCallback } from 'react';

import { Nav, Icon } from '@alifd/next';
import { Link, withRouter, getInitialData } from 'ice';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useMobxStore } from '@/hooks';
import { IMenuItem } from '@/stores/MenuStore';

import styles from './index.module.scss';

const { SubNav, Item: NavItem } = Nav;

function getNavMenuItems(menusData = [], initIndex?: number | string, auth?: any) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter((item) => {
      let roleAuth = true;
      // if item.roles is [] or undefined, roleAuth is true
      if (auth && item?.auth && item?.auth instanceof Array) {
        if (item?.auth.length) {
          roleAuth = item?.auth.some((key) => auth[key]);
        }
      }
      return item.name && !item.hideInMenu && roleAuth;
    })
    .map((item, index) => {
      return getSubMenuOrItem(item, `${initIndex}-${index}`, auth);
    });
}

function getSubMenuOrItem(item: IMenuItem, index?: number | string, auth?: any) {
  const { key, name, path, icon, newWindow, external, children } = item;

  if (children && children.some((child) => child.key)) {
    const childrenItems = getNavMenuItems(children, index, auth);
    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav key={key} data-key={key} icon={icon} label={name}>
          {childrenItems}
        </SubNav>
      );

      return subNav;
    }
    return null;
  }

  const linkProps = {
    to: '',
    target: '',
    href: '',
  };
  if (newWindow) {
    linkProps.href = path;
    linkProps.target = '_blank';
  } else if (external) {
    linkProps.href = path;
  } else {
    linkProps.to = path;
  }

  const navItem = (
    <NavItem key={path} icon={icon}>
      <Link {...linkProps}>{item.name}</Link>
    </NavItem>
  );

  return navItem;
}

const Navigation = (props, context) => {
  const { auth: AUTH_CONFIG = {} } = getInitialData();
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  const { menuStore } = useMobxStore();
  const { asideMenuConfig, asideMenuCurrent, setAsideMenuCurrent } = menuStore;

  const onSelectMemo = useCallback(
    (selectedKeys) => {
      setAsideMenuCurrent(selectedKeys[0]);
    },
    [setAsideMenuCurrent],
  );

  const tSelectedKey = asideMenuCurrent || pathname || '';

  return (
    <Nav
      className="scrollbar"
      type="normal"
      defaultOpenAll
      defaultSelectedKeys={[tSelectedKey]}
      selectedKeys={[tSelectedKey]}
      onSelect={onSelectMemo}
      embeddable
      activeDirection="right"
      iconOnly={isCollapse}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
    >
      {getNavMenuItems(asideMenuConfig, 0, AUTH_CONFIG)}
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};

const PageNav = withRouter(observer(Navigation));

PageNav.displayName = 'SideNav';

export default PageNav;

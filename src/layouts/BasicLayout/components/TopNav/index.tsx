import React, { useCallback } from 'react';

import { Nav } from '@alifd/next';
import { Link, withRouter, getInitialData } from 'ice';
import { observer } from 'mobx-react';

import { useMobxStore } from '@/hooks';

import styles from './index.module.scss';

const NavItem = Nav.Item;

const getSubNavItem = (item, options) => {
  const { token } = options;
  const linkProps = {
    to: '',
    target: '',
    href: '',
  };

  if (item.newWindow) {
    linkProps.to = item.path || '';
    linkProps.target = '_blank';
  } else if (item.external) {
    linkProps.href = item.path || '';
    linkProps.target = '_blank';
  } else {
    linkProps.to = item.path;
  }

  if (item.external && linkProps.href) {
    const tStr = item.path.includes('?') ? '&' : '?';
    const tUrl = `${item.path}${tStr}`;

    return (
      <NavItem key={`${tUrl}?external=true`}>
        <a href={`${tUrl}token=${token}`} target={linkProps.target} rel="noopener noreferrer">
          {item.name}
        </a>
      </NavItem>
    );
  }

  const navItem = (
    <NavItem key={item.path.split('?')[0]}>
      {/* <Link {...linkProps}>{item.name}</Link> */}
      {item.name}
    </NavItem>
  );

  return navItem;
};

function getNavMenuItems(menusData: any, options) {
  const { token, auth } = options;
  if (!menusData) {
    return [];
  }

  return menusData
    .filter((item) => {
      let roleAuth = true;
      // if item.roles is [] or undefined, roleAuth is true
      if (auth && item.auth && item.auth instanceof Array) {
        if (item.auth.length) {
          roleAuth = item.auth.some((key) => auth[key]);
        }
      }
      return item.name && !item.hideInMenu && roleAuth;
    })
    .map((item) => {
      return getSubNavItem(item, { token });
    });
}

const TopNav = (props) => {
  const { auth: AUTH_CONFIG = {} } = getInitialData();
  const { headerMenuConfig, headerMenuCurrent, setHeaderMenuCurrent, setAsideMenuCurrent, getDefaultMenuItemPath } =
    useMobxStore('menuStore');

  const handleNavClick = useCallback(
    (key = []) => {
      // 非外部链接可更改当前顶部菜单选项
      if (key.length && key[0].indexOf('external=true') === -1) {
        const defaultTab = getDefaultMenuItemPath({ pathname: key[0].split('?')[0], search: key[0].split('?')[1] });

        setHeaderMenuCurrent(key[0]);
        setAsideMenuCurrent(defaultTab);
        props.history.push(defaultTab);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setHeaderMenuCurrent, setAsideMenuCurrent],
  );

  if (!headerMenuConfig.length) {
    return null;
  }

  return (
    <div className={styles.headerNavbar}>
      <Nav
        className={styles.headerNavbarMenu}
        type="normal"
        direction="hoz"
        activeDirection="bottom"
        defaultSelectedKeys={[headerMenuCurrent]}
        selectedKeys={[headerMenuCurrent]}
        onSelect={handleNavClick}
      >
        {getNavMenuItems(headerMenuConfig, {
          getDefaultMenuItemPath,
          token: props.token,
          auth: AUTH_CONFIG,
        })}
      </Nav>
    </div>
  );
};

export default withRouter(observer(TopNav));

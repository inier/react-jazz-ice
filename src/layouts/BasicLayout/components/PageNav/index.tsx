import React, { memo, useEffect, useState } from 'react';

import { Nav, Icon } from '@alifd/next';
import { Link, withRouter, getInitialData } from 'ice';
import PropTypes from 'prop-types';

import { formatRoutes } from '@/routes';
import { mapTree } from '@/utils';

// import { asideMenuConfig } from '../../menuConfig';
import styles from './index.module.scss';

const { SubNav } = Nav;
const NavItem = Nav.Item;

// mock the auth object
// Ref: https://ice.work/docs/guide/advance/auth#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%9D%83%E9%99%90%E6%95%B0%E6%8D%AE
const AUTH_CONFIG = {
  admin: true,
  guest: false,
};

export interface IMenuItem {
  name: string;
  path: string;
  icon?: string;
  children?: IMenuItem[];
}

function getNavMenuItems(menusData: any, initIndex?: number | string, auth?: any) {
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
    .map((item, index) => {
      return getSubMenuOrItem(item, `${initIndex}-${index}`, auth);
    });
}

function getSubMenuOrItem(item: IMenuItem, index?: number | string, auth?: any) {
  if (item.children && item.children.some((child) => child.name)) {
    const childrenItems = getNavMenuItems(item.children, index, auth);
    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav key={item.name} icon={item.icon} label={item.name}>
          {childrenItems}
        </SubNav>
      );

      return subNav;
    }
    return null;
  }
  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path}>{item.name}</Link>
    </NavItem>
  );

  return navItem;
}

const getMenuData = () => {
  const { routes } = getInitialData();
  const tRoutes = formatRoutes(routes);

  if (!tRoutes) {
    return null;
  }

  const result = mapTree(tRoutes, ({ path, pageConfig, children }) => {
    const { title: name, hideInMenu = false, locale, authority, icon, hideChildrenInMenu } = pageConfig || {};

    return {
      path,
      icon: <Icon type={icon || 'icon-tag'} size="small" className={styles.sideMenuIcon} />,
      name,
      hideInMenu,
      hideChildrenInMenu,
      locale,
      authority,
      children,
    };
  });

  console.log('formatRoutes: ', result);
  return result;
};

const Navigation = memo((props, context) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  const asideMenuConfig: any = getMenuData();

  useEffect(() => {
    const curSubNav = asideMenuConfig.find((menuConfig) => {
      return menuConfig.children && checkChildPathExists(menuConfig);
    });

    function checkChildPathExists(menuConfig) {
      return menuConfig.children.some((child) => {
        return child.children ? checkChildPathExists(child) : child.path === pathname;
      });
    }

    if (curSubNav && !openKeys.includes(curSubNav.name)) {
      setOpenKeys([...openKeys, curSubNav.name]);
    }
  }, [asideMenuConfig, openKeys, pathname]);

  return (
    <Nav
      type="normal"
      openKeys={openKeys}
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      // popupAlign="outside"
      embeddable
      activeDirection="right"
      iconOnly={isCollapse}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
      onOpen={(keys) => {
        // @ts-ignore
        setOpenKeys(keys);
      }}
    >
      {getNavMenuItems(asideMenuConfig, 0, AUTH_CONFIG)}
    </Nav>
  );
});

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};

const PageNav = withRouter(Navigation);

PageNav.displayName = 'SideNav';

export default PageNav;

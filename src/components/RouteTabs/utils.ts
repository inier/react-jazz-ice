import { nanoid } from 'nanoid';

/**
 * 获取uuid
 */
export const getTabId = () => {
  return nanoid(10);
};

/** 根据location 生成 path */
export const generateRoutePath = (location) => {
  if (typeof location === 'string') {
    return location;
  }
  if (!location.pathname) {
    return '/';
  }

  let search = '';
  if (location.search) {
    search = location.search;
  } else if (location.query) {
    search = Object.keys(location.query)
      .map((key) => `${key}=${location.query[key]}`)
      .join('&');
  }

  return `${location.pathname}${search ? `${search.indexOf('?') > -1 ? '' : '?'}${search}` : ''}${
    location.hash ? `#${location.hash}` : ''
  }`;
};

export const isEqualLocation = (a, b) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (a.pathname === b.pathname) {
    if (Object.keys(a.query || {}).length === Object.keys(b.query || {}).length) {
      if (Object.keys(a.query || {}).every((key) => a.query[key] === b.query[key])) {
        return true;
      }
    }
  }
  return false;
};

export const createTabId = (location) => {
  return `tab-${location.pathname}-${getTabId()}`;
};

/**
 * 创建一个新的页签
 */
export const createNewTab = (location, routeConfig) => {
  const { icon, title, fixed } = routeConfig?.pageConfig || {};
  const state = location?.state || {};
  const routePath = generateRoutePath(location);
  const tabId = createTabId(location);

  return {
    $isTab: true, // 用来判断是否是选项卡对象
    tabId,
    keepaliveId: `${tabId}-${getTabId()}`,
    location,
    icon: state?.icon || icon || '',
    name: title,
    fixed,
    ...routeConfig,
    ...state,
    // force: false, // 避免后退操作的时候新开一个标签页
    routePath,
  };
};

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export const parseQuery = function (query) {
  const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  const obj = {};
  while (reg.exec(query)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
};

export const parsePath = (path) => {
  const index = path.indexOf('?');
  const pathname = index > -1 ? path.substring(0, path.indexOf('?')) : path;
  const search = index > -1 ? path.substring(+path.indexOf('?') + 1) : '';
  const query = parseQuery(search);
  return {
    pathname,
    search,
    query,
  };
};

export const isValidTabParam = (param) => {
  if (param) {
    if (typeof param === 'string' && param.indexOf('/') === 0) {
      return true;
    } else if (isObject(param) && param.pathname) {
      return true;
    }
  }
  return false;
};

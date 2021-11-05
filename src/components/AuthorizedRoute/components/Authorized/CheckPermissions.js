/* eslint-disable import/no-cycle */
import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './index';
// const CURRENT = 'admin';

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { string |array | Promise | Function } authority 权限判定 Permission judgment
 * @param { string } currentAuthority 你的权限 Your permission description
 * @param { Component } target 通过的组件 Passing components
 * @param { Component } Exception 未通过的组件 no pass components
 * @returns { Component }
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target;
    }
    return Exception;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  // Function 处理
  if (typeof authority === 'function') {
    const bool = authority(currentAuthority);
    // 函数执行后返回值是 Promise
    if (isPromise(bool)) {
      return <PromiseRender ok={target} error={Exception} promise={bool} />;
    }
    if (bool) {
      return target;
    }
    return Exception;
  }

  throw new Error('unsupported parameters');
};

export { checkPermissions };

const check = (authority, target, Exception) => {
  return checkPermissions(authority, CURRENT, target, Exception);
};

export default check;

/* eslint-disable import/no-cycle */
import { checkPermissions } from './CheckPermissions';

const Authorized = (props) => {
  // children：正常渲染的元素，权限判断通过时展示 ReactNode
  // authority：准入权限/权限判断 string | array | Promise
  // noMatch：权限异常渲染元素，权限判断不通过时展示 ReactNode
  const { children, authority, noMatch = null } = props;
  const childrenRender = typeof children === 'undefined' ? null : children;

  // checkPermissions返回childrenRender或者noMatch
  return checkPermissions(authority, childrenRender, noMatch);
};

export default Authorized;

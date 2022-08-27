import cookie from 'js-cookie';
import { stringify } from 'qs';

/**
 * 重定向跳转登录
 * @param {string} absolutePath 重定向的绝对路径
 */
export const goToLoginWithRedirect = (absolutePath?) => {
  sessionStorage.setItem('token', '');
  if (window.location.href.includes(`/${PUBLIC_URL}/user/login?redirect`)) {
    // token 过期处理
    const queryString = stringify({
      redirect: absolutePath?.indexOf('http') >= 0 ? absolutePath : window.location.href,
    });

    console.log('无权限，跳转登录');
    window.location.href = `${window.location.origin}/${PUBLIC_URL}/user/login?${queryString}`;
  }
};

/**
 * 获取LocalStorage中的用户信息
 */
export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user') || '';
    const result = JSON.parse(user);
    return result;
  } catch (error) {
    return null;
  }
};

/**
 * 设置用户信息到LocalStorage
 * @param user
 */
export const setUserToStorage = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * 清除LocalStorage中的用户信息
 */
export const cleanUserToStorage = () => {
  localStorage.removeItem('user');
};

/**
 * 获取用户Token
 */
export const getUserTokenFromCookie = () => {
  const userToken = cookie.get('token');
  return userToken ? JSON.parse(userToken) : null;
};

/**
 * 设置用户Token
 * @param token
 */
export const setUserTokenToCookie = (token: Record<string, string> | null) => {
  cookie.set('token', token ? JSON.stringify(token) : 'null', {
    expires: 30,
  });
};
/**
 * 清除用户Token
 */
export const clearUserTokenToCookie = () => {
  cookie.remove('token');
};

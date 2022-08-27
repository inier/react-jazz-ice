// 辅助工具集合，项目通用方法、函数等的统一出口

// const isProd = process.env.ENV === 'production';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  // eslint-disable-next-line max-len
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

/**
 * 判断是否是有效的 URL
 * @param path
 */
export const isUrl = (path: string): boolean => reg.test(path);

export const getUuid = (length) => Number(`${Math.random().toString().substr(3, length)}${Date.now()}`).toString(36);

/**
 * 是否是开发模式
 */
export const isDev = (): boolean => {
  const { NODE_ENV } = process.env;
  return NODE_ENV === 'development';
};

// 参数处理
export * from './params';
// 字符处理
export * from './string';
// 数据相关：Array和Map等
export * from './data';
// 国际化处理
export * from './locale';
// 用户信息处理
export * from './user';
// 加解密
export * from './encrypt';
// 设备信息相关
export * from './checkDevice';
// 表单处理
export * from './form';
// 鉴权相关
export * from './authority';
// 本地存储
export { default as storage } from './storage';

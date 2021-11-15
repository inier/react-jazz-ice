// 基础方法集

/**
 * get value of name from cookie
 * @param {String} name cookie name
 * @returns {*} 指定name的cookie
 */
export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
}

/**
 * 过滤掉字符串中的emoji表情(如果数据库编码为utf8，最多能存储3个字节，需设置为utf8mb4，否则前端需过滤掉 ))
 * @param {*} str 字符串
 * @returns 过滤后的字符串
 */
export function emoji2Str(str) {
  return unescape(escape(str).replace(/%uD.{3}/g, ''));
}

/**
 * @description  转义htm标签
 * @date 2018-10-10
 * @param {*} str 字符串
 * @returns 转以后的字符串
 */
export function escapeHTML(str) {
  if (str.length === 0) return '';
  return `${str}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

/**
 * @description  反转义htm标签
 * @date 2018-10-10
 * @param {*} str 字符串
 * @returns 转以后的字符串
 */
export function unescapeHTML(str) {
  if (str.length === 0) return '';
  return `${str}`
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

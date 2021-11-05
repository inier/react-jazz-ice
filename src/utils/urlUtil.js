// url相关操作方法

/**
 * @description 通过url得到url对象
 * @param {String} url url
 * @returns {*} url对象，没有返回null
 */
export function urlParse(url) {
  /* eslint-disable no-useless-escape */
  const urlObj = {
    protocol: /^(.+)\:\/\//,
    host: /\:\/\/(.+?)[\?\#\s\/]/,
    path: /\w(\/.*?)[\?\#\s]/,
    query: /\?(.+?)[\#\/\s]/,
    hash: /\#(\w+)\s$/,
  };

  function formatQuery(str) {
    return str.split('&').reduce((a, b) => {
      const arr = b.split('=');
      a[arr[0]] = arr[1];
      return a;
    }, {});
  }

  if (!url) {
    return {};
  }

  try {
    Object.keys(urlObj).forEach((key) => {
      const pattern = urlObj[key];

      if (key === 'query') {
        urlObj[key] = pattern.exec(url) && formatQuery(pattern.exec(url)[1]);
      } else {
        urlObj[key] = pattern.exec(url) && pattern.exec(url)[1];
      }
    });
  } catch (err) {
    console.log(err);
  }

  return urlObj;
}

/**
 * @description 用于获取url中的指定参数
 * @param {String} val 查询key
 * @returns {*} 对应的value，没有返回null
 */
export function getQueryString(val) {
  const reg = new RegExp(`(^|&)${val}=([^&]*)(&|$)`);
  const r = decodeURIComponent(window.location.search.substr(1)).match(reg);

  if (r !== null) {
    return unescape(r[2]);
  }

  return null;
}

/**
 * @description 拼接url参数
 * @param {String} src url 或 uri
 * @param {Object} params 参数
 * @returns {String} 拼接后的 url
 */
export function addQueryParams(src = '', params = {}) {
  let paramsStr = '';
  let tSrc = src;

  Object.keys(params).forEach((key) => {
    paramsStr += `&${key}=${params[key]}`;
  });

  if (paramsStr === '') {
    return tSrc;
  } else {
    if (/\?/g.test(tSrc)) {
      tSrc += paramsStr;
    } else {
      tSrc += `?${paramsStr.substring(1)}`;
    }

    return tSrc;
  }
}

/**
 * @description 替换url参数
 * @param {String} url url链接
 * @param {String} arg 参数key
 * @param {String} val 参数值
 * @returns 返回替换后的URL
 */
export function replaceQueryParams(url, arg, val) {
  const pattern = `${arg}=([^&]*)`;
  const replaceText = `${arg}=${val}`;
  let currUrl = '';

  if (url.match(pattern)) {
    /* eslint-disable no-eval */
    const tmp = `/(${arg}=)([^&]*)/gi`;
    currUrl = url.replace(eval(tmp), replaceText);
  } else {
    currUrl = url.includes('?') ? `${url}&${replaceText}` : `${url}?${replaceText}`;
  }

  return currUrl;
}

/**
 * @description 删除url参数
 * @param {String} url url链接
 * @param {String} param 参数名
 * @returns 返回删除参数后的URL
 */
export function removeQueryParams(url, param) {
  const urlparts = url.split('?');
  if (urlparts.length >= 2) {
    // 参数名前缀
    const prefix = `${encodeURIComponent(param)}=`;
    const pars = urlparts[1].split(/[&;]/g);

    // 循环查找匹配参数
    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        // 存在则删除
        pars.splice(i, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '');
  }
  return url;
}

/**
 * @description url的search转换为参数对象 ?a=1&b=2  => {a:'1',b:'2'}
 * @param {String} lsearch =location.search
 * @returns {Object} 转换后的对象
 */
export function search2obj(lsearch) {
  const search = (lsearch && lsearch.substr(1)) || '';

  if (!search) {
    return {};
  }

  const paramsList = search.split('&');
  const params = {};

  paramsList.forEach((i) => {
    if (!i) {
      return;
    }

    const p = i.split('=');
    if (p.length === 1) {
      params[p[0]] = '';
    } else {
      params[p[0]] = p[1];
    }
  });

  return params;
}

/**
 * @description 参数对象转换为url的search，{a:'1',b:'2'} => ?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 * @returns {string}
 */
export const obj2search = (obj) => {
  const search = Object.keys(obj)
    .map((i) => `${i}=${obj[i]}`)
    .join('&');

  if (!search) {
    return '';
  }

  return `?${search}`;
};

/**
 * 通过参数对象获取url，{a:'1',b:'2'} => http://xxxxxxx?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 * @returns {string}
 */
export const getUrlWithSearchObj = (obj) => {
  const params = search2obj(window.location.search);
  Object.assign(params, obj);

  return `${window.location.origin}${window.location.pathname}${obj2search(params)}`;
};

/**
 * @description 对指定字符串进行base64编码
 * @param {String} val 需要编码的数据
 * @returns {*} 编码后的数据
 */
export function urlEncodeBase64(val) {
  return window.btoa(unescape(encodeURIComponent(val)));
}

/**
 * @description 对指定字符串进行base64解码
 * @param {String} val 需要解码的数据
 * @returns {*} 解码后端数目
 */
export function urlDecodeBase64(val) {
  return decodeURIComponent(escape(window.atob(val)));
}

/**
 * @description 格式化path
 * @param {string} path path
 * @returns {string} 格式化后的path
 */
export function fomatPath(path) {
  if (!path) {
    return '/404';
  } else if (path.indexOf('//') >= -1) {
    return path;
  }
  return path.indexOf('/') === 0 ? path : `/${path}`;
}

/**
 * @description 获取包含path的url
 * @param {string} path path
 * @returns {string} 格式化后的path
 */
export function getUrl(path) {
  if (!path) {
    return '/404';
  }

  if (path.indexOf('://') > -1) {
    return path;
  } else {
    return `${window.location.origin}${fomatPath(path)}`;
  }
}

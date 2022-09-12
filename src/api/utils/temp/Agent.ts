// 接口请求底层

/**
 * @description 判断响应格式
 * @param {*} headers 返回的响应头或请求头
 * @param {*} type 请求类型, application/json：JSON数据格式,默认;application/octet-stream：二进制流数据（如常见的文件下载）
 * @returns {boolean}
 */
export function checkContentType(headers: any = {}, type: any = 'application/json'): boolean {
  if (!Object.keys(headers).length) {
    console.log('header配置有误', headers);
    return false;
  }

  const contentType = headers.get('content-type') || '';

  if (contentType.indexOf(type) >= 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * @description 网络请求的基础类，功能包含，发起请求、提示错误
 * @class Agent
 */
class Agent {
  headers: Headers;
  constructor() {
    this.headers = new Headers();
    // header类型不区分大小写
    this.headers.append('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    this.headers.append('accept', 'application/json, text/javascript, */*; q=0.01');
  }

  /**
   * @description 接受接口的返回
   * @param {*} res 返回的res
   * @returns 返回的res
   */
  // handleResponse(res) {
  //     if (!res || res.status >= 400) {
  //         return undefined;
  //     }
  //     return res.json();
  // }
  handleResponse(res: { ok: any; headers: any; json: () => any; text: () => any; status: any; statusText: any }) {
    if (res && res.ok) {
      const tHeader = res.headers;
      if (!Object.keys(tHeader).length || checkContentType(tHeader, 'application/json')) {
        return res.json();
      } else if (checkContentType(tHeader, 'application/octet-stream')) {
        return res;
      } else {
        return res.text();
      }
    } else {
      const error: any = new Error(`请求失败！状态码：${res.status}，失败信息：${res.statusText}`);
      error.response = res;
      return Promise.reject(error);
    }
  }

  /**
   * @description 发生错误的回调
   * @param {Error} error 错误内容
   * @returns undefined
   */
  handleCatch(error: Error) {
    console.error(error);
    return undefined;
  }

  /**
   * @description POST请求，params参数里面可以用noToken:true设置不带token
   * @param {*} url 请求的url
   * @param {*} params 参数
   * @returns Promise
   */
  post(url: any, params: any) {
    return this.sendRequest(url, params, 'POST', false);
  }

  /**
   * @description GET请求，params参数里面可以用noToken:true设置不带token
   * @param {*} url 请求的url
   * @param {*} params 参数
   * @returns Promise
   */
  get(url: any, params: any) {
    return this.sendRequest(url, params, 'GET', false);
  }

  /**
   * @description POST请求，params参数里面可以用noToken:true设置不带token
   * @param {*} url 请求的url
   * @param {*} param 参数
   * @param {*} headers 自定义的header
   * @returns Promise
   */
  postWithHeader(url: any, param: any, headers: any) {
    return this.sendRequestWithHeader(url, param, 'POST', headers);
  }

  /**
   * @description GET请求，params参数里面可以用noToken:true设置不带token
   * @param {*} url 请求的url
   * @param {*} param 参数
   * @param {*} headers 自定义的header
   * @returns Promise
   */
  getWithHeader(url: any, param: any, headers: any) {
    return this.sendRequestWithHeader(url, param, 'GET', headers);
  }

  /**
   * @description 上传文件
   * @param {*} url 请求的url
   * @param {*} params 参数
   * @returns Promise
   */
  postFile(url: any, params: any) {
    return this.sendRequest(url, params, 'POST', true);
  }

  /**
   * @description 统一请求 isFile判断是否是文件上传
   * @param {*} url 请求的url
   * @param {*} _params 请求的参数
   * @param {*} _type 请求的类型 ‘POST’，‘GET’等
   * @param {boolean} isFile 是否为上传文件
   * @returns Promise
   */
  sendRequest(url: any, _params: any, _type: any, isFile: boolean) {
    let fullUrl = url;
    let type = _type;
    let params = _params;
    let form: any = [];

    // type不传就默认为GET
    type = type || 'GET';
    // 组装参数
    params = params || {};

    if (isFile) {
      // 上传文件是删除Content-Type,使用浏览器自动生成的
      this.headers.delete('content-type');
      form = new FormData();
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== undefined) {
          form.append(key, typeof value === 'string' ? value.trim() : value);
        }
      });
    } else {
      this.headers.set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8;');
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (params[key] !== undefined) {
          form.push(`${key}=${encodeURIComponent(typeof value === 'string' ? value.trim() : value)}`);
        }
      });
      form = form.join('&');
    }

    const rq: any = {
      method: type,
      headers: this.headers,
      // 提交cookie
      credentials: 'include',
    };

    // 如果是GET请求，就拼接URL
    if (type === 'GET') {
      if (fullUrl.search(/\?/) === -1) {
        if (form.length !== 0) fullUrl = `${fullUrl}?${form}`;
      } else {
        fullUrl = `${fullUrl}&${form}`;
      }
    } else {
      rq.body = form;
    }

    return fetch(fullUrl, rq)
      .then(this.handleResponse)
      .then((json) => json)
      .catch(this.handleCatch);
  }

  /**
   * @description 统一发起请求，自定义header
   * @param {*} url url
   * @param {*} _params 参数
   * @param {string} [type="GET"] 请求类型
   * @param {*} headers 自定义的header
   * @returns  Promise
   */
  sendRequestWithHeader(url: any, _params: any, type = 'GET', headers: any) {
    let fullUrl = url;
    let params = _params;
    let form: any = [];

    // 组装参数
    params = params || {};

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (params[key] !== undefined) {
        form.push(`${key}=${encodeURIComponent(typeof value === 'string' ? value.trim() : value)}`);
      }
    });
    form = form.join('&');

    const rq: any = {
      method: type,
      headers,
      // 提交cookie
      credentials: 'include',
    };

    // 如果是GET请求，就拼接URL
    if (type === 'GET') {
      if (fullUrl.search(/\?/) === -1) {
        if (form.length !== 0) {
          fullUrl = `${fullUrl}?${form}`;
        }
      } else {
        fullUrl = `${fullUrl}&${form}`;
      }
    } else if (checkContentType(headers, 'application/json')) {
      rq.body = JSON.stringify(params);
    } else {
      rq.body = form;
    }

    return fetch(fullUrl, rq)
      .then(this.handleResponse)
      .then((json) => json)
      .catch(this.handleCatch);
  }
}

export default Agent;

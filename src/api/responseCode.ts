/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable no-console */
import { request, apiUrls } from '@/api';

// 服务器响应错误码，对应的提示信息
class ResponseCode {
  // 错误码
  codes = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  newCodes: any;

  constructor() {
    if (apiUrls.GET_RESPONSE_CODE) {
      // 用应用的第一级目录做不同应用的区分
      const appPath = window.location.pathname.split('/')[1];

      try {
        this.newCodes = JSON.parse(window.localStorage.getItem(`${appPath}_error_codes`) || '{}');
      } catch (error) {
        console.log('ResponseCode:constructor', error);
      }

      apiUrls.GET_RESPONSE_CODE && this.getNewCode();
    }
  }

  /**
   * @description 根据返回码，显示对应的信息
   * @param {*} code 错误码
   * @returns 错误的中文信息
   */
  codeMsg(code = '') {
    if (code === '-1') return;

    if (this.codes && Object.prototype.hasOwnProperty.call(this.codes, code)) {
      return this.codes[code.toString()];
    }

    if (this.newCodes && Object.prototype.hasOwnProperty.call(this.newCodes, code)) {
      return this.newCodes[code.toString()];
    } else {
      return '未知错误';
    }
  }

  // 获取在线错误码
  getNewCode() {
    // 用应用的第一级目录做不同应用的区分
    const appPath = window.location.pathname.split('/')[1];
    // 本地的版本号
    const oldVer = window.localStorage.getItem(`${appPath}_error_code_v`);

    request.get(apiUrls.GET_RESPONSE_CODE, { version: oldVer || undefined }).then((json) => {
      if (json && Number(json.result) === 0 && json.data) {
        window.localStorage.setItem(`${appPath}_error_code_v`, json.version);
        try {
          window.localStorage.setItem(`${appPath}_error_codes`, json.data ? JSON.stringify(json.data) : '{}');
        } catch (error) {
          console.log('ResponseCode:getNewCode', error);
        }
        this.newCodes = json.data;
      }
    });
  }
}

export default new ResponseCode();

/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable no-console */
import { request, apiUrls } from '@/api';

// 服务器响应错误码，对应的提示信息
class ResponseCode {
  codes = {};
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

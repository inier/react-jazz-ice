/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable no-console */
import { Agent, ApiUrls } from '@/api';

const APIAgent = new Agent();

/**
 * 服务器返回的错误码，对于的提示信息
 */
class ResponseCode {
  codes = {};
  newCodes: any;

  constructor() {
    // 用应用的第一级目录做不同应用的区分
    const appPath = window.location.pathname.split('/')[1];

    try {
      this.newCodes = JSON.parse(window.localStorage.getItem(`${appPath}_error_codes`) || '{}');
    } catch (error) {
      console.log('ResponseCode:constructor', error);
    }

    ApiUrls.GET_RESPONSE_CODE && this.getNewCode();
  }

  /**
   * @description 根据返回码，显示对应的信息
   * @param {*} code 错误码
   * @returns 错误的中文信息
   */
  showMsg(code = '') {
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

  /**
   * 获取在线错误码
   *
   * @memberof ResponseCode
   */
  getNewCode() {
    // 用应用的第一级目录做不同应用的区分
    const appPath = window.location.pathname.split('/')[1];
    // 本地的版本号
    const oldVer = window.localStorage.getItem(`${appPath}_error_code_v`);

    APIAgent.get(ApiUrls.GET_RESPONSE_CODE, { version: oldVer || undefined }).then((json) => {
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

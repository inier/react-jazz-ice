/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable no-console */
import { request, apiUrls } from '@/api';

// 授权错误
export const authErrMap = {
  10031: '登录失效，需要重新登录', // token 失效
  10032: '您太久没登录，请重新登录~', // token 过期
  10033: '账户未绑定角色，请联系管理员绑定角色',
  10034: '该用户未注册，请联系管理员注册用户',
  10035: 'code 无法获取对应第三方平台用户',
  10036: '该账户未关联员工，请联系管理员做关联',
  10037: '账号已无效',
  10038: '账号未找到',
};

// 普通错误
export const commonErrMap = {
  ...authErrMap,
  '-1': '登录已过期，请重新登录',
  1: '未知原因导致操作失败',
};

// 服务器响应错误码，对应的提示信息
class ResponseCode {
  // 错误码
  codes = commonErrMap;
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
    if (code === '-1') {
      return;
    }
    if (this.codes && Object.prototype.hasOwnProperty.call(this.codes, code)) {
      return this.codes[code.toString()];
    }
    if (this.newCodes && Object.prototype.hasOwnProperty.call(this.newCodes, code)) {
      return this.newCodes[code.toString()];
    }

    return '';
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

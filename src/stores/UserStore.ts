/* eslint-disable no-param-reassign */
/**
 * 保存用户信息与登录信息token等其他公共信息
 */
import { makeAutoObservable, observable, action } from 'mobx';

import { fakeAccountLogin } from '@/services/login';
import { getQueryString } from '@/utils';

class UserStore {
  rootStore: any;
  // 全局token
  token = '123456';
  userInfo = {
    avatar: '',
    name: '',
  };

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;

    // 数据持久化
    rootStore.persistParam('token', true, true); // 单个key
    // rootStore.persistParam(['mobile', 'nickName', 'imgUrl']); // 多个key，示例

    // 从Url获得token参数
    const tToken = getQueryString('token');
    if (tToken) {
      this.setToken(tToken);
    }

    // 请求中挂全局参数，比如token
    rootStore.commonRequestData = { token: this.token };
  }

  /**
   * @description token 过期后自动刷新 token
   * @param {String} url 调用刷新的接口
   * @param {Object} params 调用刷新的接口的参数
   * @param {object} opts 其他操作参数
   * @param {String} type 请求类型
   */
  refreshToken(url, params, opts, type?) {
    this.setToken(undefined);
    // 刷新token的逻辑
    // ...
  }

  setToken(token) {
    this.token = token;
  }

  setUserInfo(res) {
    this.userInfo = res;
  }

  /**
   * 退出登录
   */
  loginOut() {
    this.setToken(undefined);
  }

  async getUser() {
    return fakeAccountLogin().then((res: any) => {
      this.setUserInfo(res);

      return res;
    });
  }
}

export default UserStore;

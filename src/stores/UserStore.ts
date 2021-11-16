/* eslint-disable no-param-reassign */
/**
 * 保存用户信息与登录信息token等其他公共信息
 */
import { makeAutoObservable, observable, action } from 'mobx';
import { getQueryString } from '@/utils';
import { getLocationByIP } from '@/api/services/user';
import { fakeAccountLogin } from '@/api/services/login';

class UserStore {
  // 全局token
  @observable token = '';
  rootStore: any;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
    // 数据持久化
    rootStore.persistParam('token', true, true); // 单个key
    // this.persistParam(['mobile', 'nickName', 'imgUrl']); // 多个key，示例

    // 从Url获得token参数
    const tToken = getQueryString('token');
    if (tToken) {
      this.setToken(tToken);
    }

    rootStore.commonRequestData = { token: this.token };
    rootStore.refreshToken = this.refreshToken.bind(this);
    this.getIP();
  }

  /**
   * @description token 过期后自动刷新 token
   * @param {String} url 调用刷新的接口
   * @param {Object} params 调用刷新的接口的参数
   * @param {String} type 请求类型
   */
  refreshToken(url, params, type) {
    this.setToken(undefined);
    // 刷新token的逻辑
    // ...
  }

  @action
  setToken(token) {
    this.token = token;
  }

  /**
   * 退出登录
   */
  loginOut = () => {
    this.setToken(undefined);
  };

  getIP = () => {
    return getLocationByIP().then((res) => {
      console.log('location:', res);
      return res;
    });
  };

  getUser = () => {
    return fakeAccountLogin().then((res) => {
      console.log('getUser:', res);
      return res;
    });
  };
}

export default UserStore;

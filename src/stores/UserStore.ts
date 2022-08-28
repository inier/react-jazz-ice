/* eslint-disable no-param-reassign */
/**
 * 保存用户信息与登录信息token等其他公共信息
 */
import { makeAutoObservable } from 'mobx';

import avatar from '@/assets/img/avatar.png';
import { login, loginOut as loginOutService } from '@/services/user';
import { getQueryString } from '@/utils';

class UserStore {
  rootStore: any;

  // 全局token
  token = '123456';
  userInfo = {
    name: 'Admin',
    avatar,
    desc: '',
  };

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;

    // 数据持久化
    rootStore.persistParam(this, 'token', true, true); // 单个key
    // rootStore.persistParam(['mobile', 'nickName', 'imgUrl']); // 多个key，示例
    rootStore.persistParam(this, 'userInfo');

    // 从Url获得token参数
    const tToken = getQueryString('token');
    if (tToken) {
      this.setToken(tToken);
    }

    // 请求中挂全局参数，比如token
    rootStore.commonRequestData = { token: this.token };
  }

  setToken(token) {
    this.token = token;
  }

  setUserInfo(res) {
    this.userInfo = res;
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

  loginIn(values) {
    return login(values)
      .then((res) => {
        const { data } = res;

        if (data && data.token) {
          this.setToken(data.token);
          this.setUserInfo({
            name: data.userName,
            avatar: data.avatar || avatar,
            desc: data.portalName,
          });

          return res;
        }

        return res;
      })
      .catch((err) => {
        console.log('loginIn:', err);
        return false;
      });
  }

  /**
   * 退出登录
   */
  loginOut() {
    loginOutService(this.token).then((res) => {
      if (res) {
        this.setToken(undefined);
      }
    });
  }
}

export default UserStore;

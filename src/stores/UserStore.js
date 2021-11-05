/**
 * 保存用户信息与登录信息token等其他公共信息
 */
import { observable, action } from 'mobx';
import { ApiUrls } from '@/api';
import { getQueryString } from '@/utils';
import Store from '@/stores/Store';

class UserStore extends Store {
  // 全局token
  @observable token = '';

  constructor(rootStore) {
    super();

    this.rootStore = rootStore;
    // 数据持久化
    this.persistParam('token', true, true); // 单个key
    // this.persistParam(['mobile', 'nickName', 'imgUrl']); // 多个key，示例

    // 从Url获得token参数
    const tToken = getQueryString('token');
    if (tToken) {
      this.setToken(tToken);
    }

    Store.commonRequestData = { token: this.token };
    Store.refreshToken = this.refreshToken.bind(this);
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
   * 获取鉴权Url
   * @param {object} params 重定向url
   * @returns {promise}
   */
  getAuthUrl = (
    params = {
      redirectUri: `${window.location.origin}${process.env.PUBLIC_URL}`,
    },
  ) => {
    return this.sendGet(ApiUrls.GET_AUTHORIZE_URL, params, true).then((json) => {
      const { result, data } = json;
      if (result === '0' && data) {
        window.location.replace(json.data);
      }
    });
  };

  /**
   *
   * 检查权限
   * @memberof UserStore
   * @returns Promise
   */
  checkAuth() {
    // 请求权限鉴定
    return this.sendPost(ApiUrls.CHECK_RESCODE_AUTHORITY, {
      resourceCode: getQueryString('resCode'),
    }).then((res) => res && res.result === '0');
  }

  /**
   * 退出登录
   */
  loginOut = () => {
    this.setToken(undefined);
  };
}

export default UserStore;

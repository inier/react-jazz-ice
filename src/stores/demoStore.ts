/* eslint-disable no-param-reassign */
/**
 * 保存用户信息与登录信息token等其他公共信息
 */
import { makeAutoObservable } from 'mobx';
import { getLocationByIP } from '@/api/services/user';
import { fakeAccountLogin } from '@/api/services/login';

class DemoStore {
  rootStore: any;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    // 数据持久化
    rootStore.persistParam('token', true, true); // 单个key
    // rootStore.persistParam(['mobile', 'nickName', 'imgUrl']); // 多个key，示例
  }

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

export default DemoStore;

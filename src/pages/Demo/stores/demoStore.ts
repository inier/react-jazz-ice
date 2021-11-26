/* eslint-disable no-param-reassign */
/**
 * 保存用户信息与登录信息token等其他公共信息
 */
import { action, makeAutoObservable, observable } from 'mobx';
import userService from '@/api/services/demo';

class DemoStore {
  rootStore: any;
  @observable userInfo = {};

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    // 数据持久化
    rootStore.persistParam('token', true, true); // 单个key
    // rootStore.persistParam(['mobile', 'nickName', 'imgUrl']); // 多个key，示例
  }

  @action
  getUser = async () => {
    const res = await userService.getUser();

    console.log('getUser:', res);
    this.userInfo = res;

    return res;
  };
}

export default DemoStore;

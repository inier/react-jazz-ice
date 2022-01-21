/* eslint-disable no-param-reassign */
import { action, makeAutoObservable, observable } from 'mobx';
import userService from '@/pages/Demo/services/demo';

class DemoStore {
  rootStore: any;
  userInfo = {
    avatar: '',
    name: '',
  };

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    // 数据持久化
    rootStore.persistParam('token', true, true); // 单个key
    // rootStore.persistParam(['mobile', 'nickName', 'imgUrl']); // 多个key，示例
  }

  getUser = async () => {
    const res = await userService.getUser();

    console.log('getUser:', res);
    this.userInfo = res;

    return res;
  };
}

export default DemoStore;

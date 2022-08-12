/* eslint-disable no-param-reassign */
import { action, makeAutoObservable, observable } from 'mobx';
import userService from '../services/demo';

class DemoStore {
  rootStore: any;
  userInfo = {
    avatar: '',
    name: '',
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUserInfo(res) {
    this.userInfo = res;
  }

  async getUser() {
    const res = await userService.getUser();

    console.log('getUser:', res);
    this.setUserInfo(res);

    return res;
  }
}

export default new DemoStore();

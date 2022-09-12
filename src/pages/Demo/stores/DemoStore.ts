/* eslint-disable no-param-reassign */
import { makeAutoObservable } from 'mobx';

import userService from '../services/demo';

class DemoStore {
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

  async getUser(params, options) {
    return userService.fakeAccountLogin(params, options).then((res: any) => {
      this.setUserInfo(res);
      console.log('getUser:', res);

      return res;
    });
  }
}

export default new DemoStore();

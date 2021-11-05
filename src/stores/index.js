/**
 * 业务Stores整合
 */
import UserStore from './UserStore';
import UIStore from './UIStore';

class RootStore {
  constructor() {
    this.UIStore = new UIStore(this);
    this.userStore = new UserStore(this);
  }
}

export {};
export default new RootStore();

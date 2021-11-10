import Store from './Store';
/**
 * 业务Stores整合
 */
import UserStore from './UserStore';
import UIStore from './UIStore';

class RootStore extends Store {
  UIStore: UIStore;
  userStore: UserStore;

  constructor() {
    super();

    this.UIStore = new UIStore(this);
    this.userStore = new UserStore(this);
  }
}

export {};
export default new RootStore();

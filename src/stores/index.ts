import Store from './Store';
/**
 * 业务Stores整合
 */
import UserStore from './UserStore';
import UIStore from './UIStore';
import MenuStore from './menuStore';

class RootStore extends Store {
  UIStore: UIStore;
  userStore: UserStore;
  menuStore: MenuStore;

  constructor() {
    super();

    this.UIStore = new UIStore(this);
    this.userStore = new UserStore(this);
    this.menuStore = new MenuStore(this);
  }
}

export default new RootStore();
export { UserStore, UIStore, MenuStore };

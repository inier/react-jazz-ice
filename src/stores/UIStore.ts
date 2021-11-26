/* eslint-disable no-param-reassign */
import { makeAutoObservable, observable, action } from 'mobx';
import { isMobile } from '@/utils';

/**
 * 应用当前UI的状态，比如：窗口尺寸、当前展示的页面、渲染状态、网络状态等等
 */
class UIStore {
  rootStore: any;

  // 是否展示loading图标
  @observable loading = false;

  // 需要展示的错误信息
  @observable toastMsg: any;
  isMobile: boolean | RegExpMatchArray | null;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;

    // 浏览器UA判断，true：微信，false：h5等其他
    this.isMobile = isMobile;
    // 数据持久化
    rootStore.persistParam('isMobile', undefined, true);
  }

  @action
  setLoading(boolean: boolean) {
    this.loading = boolean;
  }

  @action
  setToastMsg(msg: string) {
    this.toastMsg = msg;
  }

  /**
   * @description 显示Toast提示
   * @param {*} msg 需要显示的提示内容
   * @param {*} autoClose 是否自动关闭
   * @param {*} duration toast显示的持续时间，默认3秒
   */
  showToast = (msg: any, autoClose = true, duration = 3000) => {
    this.setToastMsg(msg);

    // 指定时间后自动关闭toast，默认3秒
    if (autoClose) {
      setTimeout(() => {
        this.setToastMsg('');
      }, duration);
    }
  };
}

export default UIStore;

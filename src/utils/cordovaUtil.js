/**
 * @description 处理关于cordova的逻辑操作
 */
class CordovaUtil {
  isCordovaApp = false;
  constructor() {
    if (!CordovaUtil.instance) {
      this.isCordovaApp = window.navigator.userAgent.toLocaleLowerCase().indexOf('cordova') >= 0;
      CordovaUtil.instance = this;
    }
    return CordovaUtil.instance;
  }

  /**
   * @description 拦截返回按钮，退出app测试
   * @param {*} history history
   */
  listenBackButton(history) {
    this.runInCodova(() => {
      window.document.addEventListener(
        'backbutton',
        () => {
          const path = history.location.pathname;
          if (path === '/' || path === '/my' || path === '/category' || path === '/cartindex/footer') {
            window.navigator.app.exitApp();
          } else {
            history.goBack();
          }
        },
        false,
      );
    });
  }

  /**
   * @description 关闭启动遮罩页面
   */
  closeSplashScreen() {
    this.runInCodova(() => {
      window.StatusBar.styleDefault();
      window.navigator.splashscreen.hide();
    });
  }

  /**
   * @description 确保需要允许的函数能在cordova加载完成后的情况下执行
   * @param {function} fuc 需要执行的函数
   */
  runInCodova(fuc) {
    if (window.cordova) {
      fuc();
    } else {
      window.document.addEventListener('deviceready', fuc, false);
    }
  }

  /**
   * @description 设置状态栏的文字为亮色
   */
  setStatusBarToLight() {
    this.runInCodova(() => {
      window.StatusBar.styleBlackOpaque();
    });
  }

  /**
   * @description 设置状态栏文字为黑色
   */
  setStatusBarToBlack() {
    this.runInCodova(() => {
      window.StatusBar.styleDefault();
    });
  }
}

export default new CordovaUtil();

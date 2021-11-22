import { persistParam } from '@/utils/persistData'; // 数据持久化
/* eslint-disable no-console */
import { request } from '@/api';

/**
 * 业务Stores整合
 */
import UserStore from './UserStore';
import UIStore from './UIStore';
import MenuStore from './menuStore';

class RootStore {
  UIStore: UIStore;
  userStore: UserStore;
  menuStore: MenuStore;
  commonRequestData: any;

  constructor() {
    this.UIStore = new UIStore(this);
    this.userStore = new UserStore(this);
    this.menuStore = new MenuStore(this);
  }

  /**
   * @description 发送GET请求
   * @param {string} service 请求service
   * @param {object} _params 参数
   * @param {object} opts 其他操作参数 如 {
   *          noCommonData:false //不挂在公共参数
   *          loading:false   //不展示loading图标
   *          toast:false //不展示接口错误信息
   *      }
   * @returns Promise
   */
  request = async (service, _params = {}, opts = { noCommonData: false, loading: false, toast: false }) => {
    if (!service) {
      return Promise.reject(Error('service的参数应该是一个promise.'));
    }
    // 是否开启loading图标
    opts.loading && this.UIStore?.handleShowLoading(true);
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, this.commonRequestData);

    return service.call(this, _params, opts).then((json) => {
      return this.handleResponse.call(this, json, {
        url: json.url,
        params: _params,
        opts,
        handleShowLoading: () => {
          this.UIStore.handleShowLoading(false);
        },
        handleRequestError: (errCode) => {
          this.UIStore.handleRequestError(errCode);
        },
        handleRequestExpire: (tUrl, tParams, tOpts) => {
          return this.refreshToken(tUrl, tParams, tOpts);
        },
      });
    });
  };

  /**
   * @description 发送GET请求
   * @param {string} url 请求地址
   * @param {object} _params 参数
   * @param {object} opts 其他操作参数 如 {
   *          noCommonData:false //不挂在公共参数
   *          loading:false   //不展示loading图标
   *          toast:false //不展示接口错误信息
   *      }
   * @returns Promise
   */
  sendGet = async (url = '', _params = {}, opts = { noCommonData: false, loading: false, toast: false }) => {
    // 是否开启loading图标
    opts.loading && this.UIStore?.handleShowLoading(true);
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, this.commonRequestData);

    return request.get(url, _params, opts).then((json) => {
      return this.handleResponse.call(this, json, {
        url,
        params: _params,
        opts,
        handleShowLoading: () => {
          this.UIStore.handleShowLoading(false);
        },
        handleRequestError: (errCode) => {
          this.UIStore.handleRequestError(errCode);
        },
        handleRequestExpire: (tUrl, tParams, tOpts) => {
          return this.refreshToken(tUrl, tParams, tOpts);
        },
      });
    });
  };

  /**
   * @description 发送POST请求
   * @param {string} url 请求地址
   * @param {object} _params 参数
   * @param {object} opts 其他操作参数 如 {
   *          noCommonData:false //不挂载公共参数，比如token
   *          loading:false   //不展示loading图标
   *          toast:false //不展示接口错误信息
   *      }
   * @returns Promise
   */
  sendPost = async (url = '', _params = {}, opts = { noCommonData: false, loading: false, toast: false }) => {
    // 是否开启loading图标
    opts.loading && this.UIStore?.handleShowLoading(true);
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, this.commonRequestData);

    return request.post(url, _params, opts).then((json) => {
      return this.handleResponse.call(this, json, {
        url,
        params: _params,
        opts,
        handleShowLoading: () => {
          this.UIStore.handleShowLoading(false);
        },
        handleRequestError: (errCode) => {
          this.UIStore.handleRequestError(errCode);
        },
        handleRequestExpire: (tUrl, tParams, tOpts) => {
          return this.refreshToken(tUrl, tParams, tOpts);
        },
      });
    });
  };
  /**
   * @description 数据持久化(localStorage或sessionStorage)
   * @param {string|array} keyNames 键值项名称
   * @param {boolean} inSessionStorage 是否添加到sessionStorage，默认为false，添加到localStorage
   * @param {boolean} global 是否用于全局，默认为false，keyName前会增加前缀（所属store的名称），true则不添加前缀
   */
  persistParam = (keyNames: string | any[], inSessionStorage = false, global = false) => {
    persistParam(this, keyNames, inSessionStorage, global);
  };

  refreshToken(url, params, opts) {
    this.userStore.refreshToken(url, params, opts);
  }

  /**
   * @description 处理获取的结果
   * 1.实现token自动刷新功能
   * 2.实现自动根据api/ResponseCode中的错误信息显示
   * @param {*} json 获取到的结果
   * @param {*} options 操作
   * @returns 获取的数据
   */
  handleResponse = (json: any, options: any) => {
    const { url, params, opts } = options;
    const { loading, toast } = opts;

    // 关闭该接口调用开启的loading
    loading && options?.handleShowLoading(false);

    if (!json || typeof json.result === 'undefined' || json.result === null) {
      !toast && options?.handleRequestError(json.result);
      console.log('数据格式不正确！');

      return {};
    }

    switch (json.result) {
      // 获取数据成功
      case '0':
        return json;
      // token过期
      case '-1': {
        return options?.handleRequestExpire(url, params, opts);
      }
      // 显示错误信息
      default: {
        console.log(`Request is get Error,Code :${json.result}`);
        !toast && options?.handleRequestError(json.result);

        return json;
      }
    }
  };
}

export { UserStore, UIStore, MenuStore };
export default new RootStore();

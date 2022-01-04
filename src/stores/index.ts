/* eslint-disable import/order */
/* eslint-disable no-console */
import { createContext } from 'react';

// 数据持久化
import { request, responseCode } from '@/api';
import { persistParam } from '@/utils/persistData';

// == 通用Stores
import MenuStore from './MenuStore';
import UIStore from './UIStore';
import UserStore from './UserStore';

// == 业务域Stores整合
// ...

// == 页面UIStore整合
// 示例代码
import DemoStore from './DemoStore';

class RootStore {
  commonRequestData: any;
  UIStore: UIStore;
  userStore: UserStore;
  menuStore: MenuStore;

  // 示例代码
  demoStore: DemoStore;

  constructor() {
    this.UIStore = new UIStore(this);
    this.userStore = new UserStore(this);
    this.menuStore = new MenuStore(this);

    // 示例代码
    this.demoStore = new DemoStore(this);
  }

  /**
   * @description 发送GET请求
   * @param {string} service 请求service
   * @param {object} _params 参数
   * @param {object} opts 其他操作参数，如 {
   *          noCommonData:false, //不挂在公共参数
   *          loading:false,  //不展示loading图标
   *          toast:false,  //不展示接口错误信息
   *      }
   * @returns Promise
   */
  request = async (service, _params = {}, opts = { noCommonData: false, loading: false, toast: false }) => {
    if (!service) {
      return Promise.reject(Error('service的参数应该是一个promise.'));
    }
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, this.commonRequestData);

    return service.call(this, _params, opts);
  };

  /**
   * @description 发送GET请求
   * @param {string} url 请求地址
   * @param {object} _params 参数
   * @param {object} opts 其他操作参数 如 {
   *          noCommonData:false, //不挂在公共参数
   *          loading:false,  //不展示loading图标
   *          toast:false,  //不展示接口错误信息
   *      }
   * @returns Promise
   */
  sendGet = (url = '', _params = {}, opts = { noCommonData: false, loading: false, toast: false }) => {
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, this.commonRequestData);

    return request.get(url, _params, opts);
  };

  /**
   * @description 发送POST请求
   * @param {string} url 请求地址
   * @param {object} _params 参数
   * @param {object} opts 其他操作参数 如 {
   *          noCommonData:false, //不挂在公共参数
   *          loading:false,  //不展示loading图标
   *          toast:false,  //不展示接口错误信息
   *      }
   * @returns Promise
   */
  sendPost = (url = '', _params = {}, opts = { noCommonData: false, loading: false, toast: false }) => {
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, this.commonRequestData);

    return request.post(url, _params, opts);
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

  /**
   * @description loading图标的展示状态回调
   * @param {*} boolean true：展示，false：不展示
   */
  handleShowLoading = (boolean: any) => {
    this.UIStore.setLoading(boolean);
  };

  /**
   * @description 请求发送错误码的回调
   * @param {*} code 错误码
   */
  handleRequestError = (code: string | undefined) => {
    this.UIStore.showToast(responseCode.codeMsg(code));
  };

  /**
   * @description 请求token 过期处理
   * @param {String} url 调用接口
   * @param {Object} params 参数
   * @param {object} opts 其他操作参数
   * @param {String} type 请求类型
   */
  handleRequestExpire = (url, params, opts, type?) => {
    // token 过期后自动刷新 token
    return this.userStore.refreshToken(url, params, opts);
  };

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
    const { toast } = opts;

    if (!json || typeof json.result === 'undefined' || json.result === null) {
      !toast && this.handleRequestError(json.result);
      console.log('数据格式不正确！');

      return {};
    }

    switch (String(json.result)) {
      // 获取数据成功
      case '0':
        return json;
      // token过期
      case '-1': {
        return this.handleRequestExpire(url, params, opts);
      }
      // 显示错误信息
      default: {
        console.log(`Request is get Error,Code :${json.result}`);
        !toast && this.handleRequestError(json.result);

        return json;
      }
    }
  };
}

const stores = new RootStore();
const StoresContext = createContext(stores);

export { StoresContext, UserStore, UIStore, MenuStore, DemoStore };
export default stores;

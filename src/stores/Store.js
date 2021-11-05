import APIAgent from '@/api/Agent'; // 请求底层处理
import { persistParam } from '@/utils/persistData.js'; // 数据持久化

const Agent = new APIAgent();

/* eslint-disable no-use-before-define */
/**
 * @description Store公共基类，集成了发送请求，持久化字段等功能
 *   用handleShowLoading handleRequestError配合UIStore，实现展示loading和错误提示，
 *   用commonRequestData 配合UserStore，实现请求中挂全局参数，比如token
 * @export
 * @class Store
 */
export default class Store {
  /**
   * @description 数据持久化(localStorage或sessionStorage)
   * @param {string|array} keyNames 键值项名称
   * @param {boolean} inSessionStorage 是否添加到sessionStorage，默认为false，添加到localStorage
   * @param {boolean} global 是否用于全局，默认为false，keyName前会增加前缀（所属store的名称），true则不添加前缀
   */
  persistParam(keyNames, inSessionStorage = false, global = false) {
    persistParam(this, keyNames, inSessionStorage, global);
  }

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
  sendPost(url = '', _params = {}, opts = { noCommonData: false, loading: false, toast: false }) {
    // 是否开启loading图标
    opts.loading && Store.handleShowLoading && Store.handleShowLoading(true);
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, Store.commonRequestData);
    return Agent.post(url, _params).then((json) => _handleData(json, url, _params, opts));
  }

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
  sendGet(url = '', _params = {}, opts = { noCommonData: false, loading: false, toast: false }) {
    // 是否开启loading图标
    opts.loading && Store.handleShowLoading && Store.handleShowLoading(true);
    // 是否挂上公共参数
    !opts.noCommonData && Object.assign(_params, Store.commonRequestData);
    return Agent.get(url, _params).then((json) => _handleData.call(this, json, url, _params, opts));
  }
}

/**
 * @description 处理获取的结果
 * 1.实现token自动刷新功能
 * 2.实现自动根据api/ResponseCode中的错误信息显示
 * @param {*} json 获取到的结果
 * @param {*} url url
 * @param {*} params 参数
 * @param {*} opts 操作
 * @returns 获取的数据
 */
function _handleData(json, url, params, opts) {
  // 只有明确接口调用开启loading才关闭，避免引起本次接口关闭掉其它接口的loading
  opts.loading && Store.handleShowLoading && Store.handleShowLoading(false);

  // 特殊格式（示例代码）
  if (json && json.results !== null) {
    return json;
  }

  if (!json || typeof json.result === 'undefined' || json.result === null) {
    !opts.toast && Store.handleRequestError && Store.handleRequestError(json.result);
    console.log('数据格式不正确！');
    return {};
  }

  switch (json.result) {
    // 获取数据成功
    case '0':
      return json;
    // token过期
    case '-1': {
      return this.refreshToken(url, params);
    }
    // 自动显示错误信息
    default: {
      console.log(`Requst is get Error,Code :${json.result}`);
      !opts.toast && Store.handleRequestError && Store.handleRequestError(json.result);
      return json;
    }
  }
}

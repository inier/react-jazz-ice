/**
 * 通过promise对axios做二次封装，针对用户端参数，做灵活配置
 */
import { Message } from '@alifd/next';
import instance from './interceptor';
import { responseCode } from '@/api';

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {object} options 请求配置，针对当前本次请求；
 *    loading 是否显示loading
 *    mock 本次是否请求mock而非线上
 *    error 本次是否显示错误
 * @param {string} method 请求配置，针对当前本次请求
 */
function request(url, params, options = { loading: true, mock: false, error: true }, method) {
  // 请求前loading
  if (options.loading) {
    // loading
    console.log('loading...');
  }

  return new Promise((resolve, reject) => {
    let data = {};

    // get请求使用params字段
    if (method === 'get') {
      data = { params };
    }
    // post请求使用data字段
    if (method === 'post') {
      data = { data };
    }
    // 通过mock平台可对局部接口进行mock设置
    if (options.mock) {
      url = 'https://www.mock.com/mock/xxxx/api';
    }

    instance({ url, method, ...data })
      .then((res: any) => {
        // 此处作用很大，可以扩展很多功能。
        // 比如对接多个后台，数据结构不一致，可做接口适配器
        // 也可对返回日期/金额/数字等统一做集中处理
        if (Number(res.result) === 0) {
          resolve(res);
        } else {
          // 通过配置可关闭错误提示
          if (options.error) Message.error(responseCode.codeMsg(res.result));
          reject(res);
        }
      })
      .catch((error) => {
        Message.error(error.message);
      })
      .finally(() => {
        console.log('loaded');
      });
  });
}
// 封装GET请求
function get(url, params, options?) {
  return request(url, params, options, 'get');
}
// 封装POST请求
function post(url, params, options?) {
  return request(url, params, options, 'post');
}

export default { get, post };

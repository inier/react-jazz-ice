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
 * loading: 是否显示loading
 * mock: 本次是否请求mock而非线上
 * error: 本次是否显示错误
 * cancelRequest: true       // 接口中定义该项则开启取消重复请求功能
 * retry: 3, retryDelay: 1000  // retry 请求重试次数，retryDelay 两次重试之间的时间间隔
 * cache: true, setExpireTime: 30000  // cache： true 开启当前接口缓存，setExpireTime 当前接口缓存时限
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
      data = { data: params };
    }
    // 通过mock平台可对局部接口进行mock设置
    if (options.mock) {
      url = 'https://www.mock.com/mock/xxxx/api';
    }

    instance({ url, method, ...options, ...data })
      .then((res: any) => {
        // 可扩展: 做接口适配器，对接多个后台(返回结构不一致)；可对返回日期/金额/数字等统一预处理
        if (Number(res.result) === 0) {
          resolve({
            ...res,
            config: {
              url,
              params,
              options,
            },
          });
        } else {
          // 通过配置可关闭错误提示
          if (options.error) {
            const errorMsg = responseCode.codeMsg(res.result);
            Message.error(errorMsg);
          }
          reject(res);
        }
      })
      .catch((error) => {
        console.log(error.message);
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

/**
 * axios二次封装
 */
import { Method } from 'axios';
import qs from 'qs';

import stores from '@/stores';

import instance from './interceptor';
import { IRequest, IOptions } from './type';

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {object} options 请求配置，针对当前本次请求
 * @param {string} method 请求配置，针对当前本次请求
 */
function request<T>(url: string, params: object, options: IOptions, method: Method): Promise<T> {
  const defaultOptions: IOptions = { loading: true, mock: false, error: true, ...options };
  const defaultParams = { ...params };

  // url = `http://10.10.123.3:8000${url}`

  // 是否挂上公共参数
  if (!defaultOptions.noCommonData) {
    Object.assign(defaultParams, stores.commonRequestData);
  }

  // 请求前loading
  if (defaultOptions.loading) {
    console.log(`${url}, loading...`);
    stores.UIStore.setLoading(true);
  }

  return new Promise((resolve, reject) => {
    let data = {};

    // get请求：使用params字段
    if (method === 'get') {
      data = { params: defaultParams };
    }
    // post请求：使用data字段
    if (method === 'post') {
      data = { data: qs.stringify(defaultParams) };
    }

    instance({ url, method, ...defaultOptions, ...data })
      .then((res: any) => {
        const result = stores.handleResponse(res, { url, params: defaultParams, opts: defaultOptions });
        resolve(result);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        // 请求完关闭loading
        if (defaultOptions.loading) {
          console.log(`${url}, loaded`);
          stores.UIStore.setLoading(false);
        }
      });
  });
}

// 封装GET请求
const get: IRequest = async (url, params, options) => {
  return request(url, params || {}, options || {}, 'get');
};
// 封装POST请求
const post: IRequest = async (url, params, options) => {
  return request(url, params || {}, options || {}, 'post');
};

export default { get, post };

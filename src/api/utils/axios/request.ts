/**
 * axios二次封装
 */
import { Method } from 'axios';
import stores from '@/stores';
import instance from './interceptor';
import { IOptions } from './type';

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {object} options 请求配置，针对当前本次请求
 * @param {string} method 请求配置，针对当前本次请求
 */
function request(url: string, params: object, options: IOptions, method: Method) {
  const defaultOptions: IOptions = { loading: true, mock: false, error: true, ...options };
  const defaultParams = { params };

  // 是否挂上公共参数
  if (!defaultOptions.noCommonData) {
    Object.assign(defaultParams, stores.commonRequestData);
  }

  // 请求前loading
  if (defaultOptions.loading) {
    console.log('1.loading...');
    stores.UIStore.setLoading(true);
  }

  return new Promise((resolve, reject) => {
    let data = {};

    // get请求使用params字段
    if (method === 'get') {
      data = { params: defaultParams };
    }
    // post请求使用data字段
    if (method === 'post') {
      data = { data: defaultParams };
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
          console.log('1.loaded');
          stores.UIStore.setLoading(false);
        }
      });
  });
}

// 封装GET请求
function get(url: string, params = {}, options?: IOptions): Promise<any> {
  return request(url, params, options || {}, 'get');
}

// 封装POST请求
function post(url: string, params = {}, options?: IOptions): Promise<any> {
  return request(url, params, options || {}, 'post');
}

export default { get, post };

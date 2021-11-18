/* eslint-disable @typescript-eslint/restrict-plus-operands */
import axios, { CancelToken, CancelTokenSource, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import qs from 'qs';

/** axios封装 请求拦截、响应拦截 */

const CANCEL_TYPE = {
  CACHE: 1,
  REPEAT: 2,
};

interface ICancel {
  data: any;
  type: number;
}

interface ITaskList {
  original: string;
  cancelToken: any;
}

const apiCache = {
  cacheMap: new Map() /** 缓存列表 */,
  taskList: [] /** 请求任务列表 */,
  /** 新增任务 */
  addTask(config, cancelToken) {
    this.taskList.push({ original: `${config.url}&${config.method}`, cancelToken });
  },
  /** 删除任务 */
  deleteTask(config, start, cancelToken?) {
    let cancel = false;
    for (let i in this.taskList) {
      if (this.taskList[i]['original'] === `${config.url}&${config.method}`) {
        this.taskList[i].cancelToken('');
        this.taskList.splice(i, 1);
        cancel = true;
        break;
      }
    }
    if (!cancel && start) {
      this.deleteCache(config, cancelToken);
    }
  },
  /** 创建key */
  createKey(config) {
    let str = '';
    config.url && (str += config.url);
    if (config.method) {
      str += `,method:${config.method}`;
      if (config.method === 'get') {
        str += `,data:${qs.stringify(config.params)}`;
      } else {
        str += `,data:${config.data}`;
      }
    }
    return str;
  },
  /** 删除缓存 */
  deleteCache(config, cancelToken) {
    let cacheMap = this.cacheMap;
    const key = this.createKey(config),
      now = new Date().getTime();
    let cache = cacheMap.get(key) || {};

    if (cache && cache.expirationTime && now <= cache.deadline && cache.data) {
      cache.cache = true;
      cancelToken(cache.data);
    }
  },
  /** 新增缓存 */
  addCache(config, cancel) {
    const key = this.createKey(config);
    const expirationTime = config.headers.expirationTime || 0;

    if (expirationTime) {
      this.cacheMap.set(key, { expirationTime, deadline: new Date().getTime() + expirationTime, data: '', cancel });
    }
  },
  /** 更新缓存 */
  updateCache(res) {
    if (!res || !res.config) {
      return false;
    }

    const key = this.createKey(res.config);
    const oldVal = this.cacheMap.get(key);

    if (!oldVal) {
      return false;
    }
    this.cacheMap.set(key, { expirationTime: oldVal.expirationTime, deadline: oldVal.deadline, data: res });
  },
};

/** 创建axios实例 */
const instance = axios.create({
  // 配置请求超时时间
  timeout: 1000 * 60,
   // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
   withCredentials: true
});

/** 设置post请求头 */
instance.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";

/** 请求拦截器 */
instance.interceptors.request.use(
  (config: any) => {
    config.cancelToken = new CancelToken((c) => {
      /** 删除任务 | 缓存 */
      apiCache.deleteTask(config, true, c);
      /** 新增任务 | 缓存 */
      apiCache.addTask(config, c);
      apiCache.addCache(config, c);
    });
    config.headers.expirationTime = undefined;

    let token = window.localStorage.getItem('token');
    token = token || '';
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => Promise.reject(error),
);

/** 响应拦截器 */
instance.interceptors.response.use(
  (res) => {
    apiCache.deleteTask(res.config, false);
    apiCache.updateCache(res);
    return Promise.resolve(res);
  },
  // 请求失败
  (error) => {
    if (error) {
      let { response } = error;
      /** 浏览器报错 */
      if (response) {
        if (response.status === 401 || response.status === 403) {
          // 未授权处理
          window.location.href = '/user/login';
        }
      }
      if (error.message) {
        if (typeof error.message === 'string') {
          response = { code: 100002, message: error.message };
        } else if (typeof error.message === 'object') {
          response = error.message;
        }
      } else {
        response = {};
      }
      return Promise.resolve(response || { code: 100002 });
    } else {
      return Promise.resolve({ code: 100002 });
    }
  },
);





/**
 * 封装 get、post 请求
 * 集成接口缓存过期机制
 * 缓存过期将重新请求获取最新数据，并更新缓存
 * 数据存储在localStorage
 * {
 *      cache: true
 *      cacheTime: 1000 * 60 * 3  -- 默认缓存3分钟
 * }
 */
const httpHelper = {
  get(url: string, params: any) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, params)
        .then(async (res: AxiosResponse) => {
          resolve(res);
        })
        .catch((error: AxiosError) => {
          if (axios.isCancel(error)) {
            const cancel: ICancel = JSON.parse(error.message);
            if (cancel.type === CANCEL_TYPE.REPEAT) {
              return resolve([]);
            } else {
              return resolve(cancel.data);
            }
          } else {
            return reject(error);
          }
        });
    });
  },
  post(url: string, params: any) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then(async (res: AxiosResponse) => {
          resolve(res);
        })
        .catch((error: AxiosError) => {
          if (axios.isCancel(error)) {
            const cancel: ICancel = JSON.parse(error.message);
            if (cancel.type === CANCEL_TYPE.REPEAT) {
              return resolve(null);
            } else {
              return resolve(cancel.data);
            }
          } else {
            return reject(error);
          }
        });
    });
  },
};

export default httpHelper;

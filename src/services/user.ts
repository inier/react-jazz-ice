import { request, apiUrls } from '@/api';

import { IPublicKey, ILoginReturn, IDataSource } from './typing';

/**
 * 获取资源列表
 * @param {object} params 参数
 * @returns {promise}
 */
export function getResList(params: object, options: any) {
  return import('@/../mock/resList.js').then((res) => res.default);
  // return request.get(apiUrls.GET_ADMIN_RES_LIST, params, options);
}

/**
 * 获取用户信息
 * @param {object} params 参数
 * @returns {promise}
 */
export function getUserInfo() {
  return request.get(apiUrls.GET_USER_INFO, {}, { loading: true });
}

export async function generatePublicKey(password) {
  return request
    .get<IPublicKey>(apiUrls.GET_PUBLIC_KEY, { ver: +new Date() }, { noCommonData: true })
    .then(({ result, data }) => {
      // 获取公钥成功
      if (result === '0') {
        const keyPair = RSAUtils.getKeyPair(data?.exp, '', data?.mod);
        const pwd = RSAUtils.encryptedString(keyPair, encodeURIComponent(password));

        return {
          mod: data?.mod,
          pwd,
        };
      }

      return { mod: '', pwd: '' };
    })
    .catch((err) => {
      console.log(err);
      return { mod: '', pwd: '' };
    });
}

export async function login(params: IDataSource) {
  try {
    const { username, password, picCode, timestamp } = params;
    const { mod, pwd } = await generatePublicKey(password);

    if (!mod || !pwd) {
      return Promise.reject(Error('服务器网络异常'));
    }

    return request.post<ILoginReturn>(
      apiUrls.POST_USER_LOGIN,
      {
        username,
        password: pwd,
        mod,
        picCode,
        picTimestamp: timestamp,
      },
      { loading: true, noCommonData: true },
    );
  } catch (err) {
    console.log(err);
    return Promise.reject();
  }
}

export async function loginOut(token) {
  return request
    .get<boolean>(apiUrls.GET_LOGIN_OFF, { token }, { loading: false })
    .then(({ result }) => {
      // 获取公钥成功
      if (result === '0') {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log('loginOut:', err);
      return false;
    });
}

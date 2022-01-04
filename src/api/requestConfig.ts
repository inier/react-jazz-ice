import { Message } from '@alifd/next';
import { history } from 'ice';

import { responseCode } from '@/api';
// import { getUserTokenFromCookie, clearUserTokenToCookie } from '@/utils';

const requestConfig: any = {
  withCredentials: true,
  withFullResponse: true,
  interceptors: {
    request: {
      onConfig: async (config) => {
        // 获取请求options
        const { headers, ...otherConfig } = config;
        // const currentTokenInfo = getUserTokenFromCookie() || {};

        return {
          headers: {
            ...headers,
            // Authorization: currentTokenInfo.token,
          },
          ...otherConfig,
        };
      },
      onError: (error) => {
        return Promise.reject(error);
      },
    },
    response: {
      onConfig: (response) => {
        // http请求异常
        if (response.status !== 200) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            code: response.status,
            msg: responseCode[response.status] || response.statusText,
            data: null,
          });
        }

        return response.data;
      },
      onError: (error) => {
        const { response, config } = error || {};
        const { status, statusText } = response || {};
        const errorText = responseCode.codeMsg[status] || statusText;

        if (status) {
          Message.show({
            title: `请求错误 ${status}: ${config.url}`,
            content: errorText,
            type: 'error',
          });
          if (status === 401) {
            // clearUserTokenToCookie();
            history?.replace('/login', {
              redirect: window.location.href,
            });
          }
        } else if (!response) {
          Message.show({
            title: '网络异常',
            content: '您的网络发生异常，无法连接服务器',
            type: 'error',
          });
        }
        return Promise.reject(error);
      },
    },
  },
};

export default requestConfig;

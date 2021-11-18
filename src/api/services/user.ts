import { getSearchParams } from 'ice';
import { request, apiUrls } from '@/api';

/**
 * 检查权限
 */
export async function checkAuth() {
  const searchParams = getSearchParams();
  // 请求权限鉴定
  return request
    .get(apiUrls.CHECK_RES_CODE_AUTHORITY, {
      params: {
        resourceCode: searchParams.resCode,
      },
    })
    .then((res) => res && res.result === '0');
}

/**
 * 通过IP获取地理信息
 */
export async function getLocationByIP() {
  return request
    .get(apiUrls.GET_IP, {
      fields: 66666,
    })
    .then((res) => {
      if (!res) {
        return {};
      }

      return { ...res, result: 0 };
    });
}

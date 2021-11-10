import { request, getSearchParams } from 'ice';
import { ApiUrls } from '@/api';

/**
 * 检查权限
 */
export async function checkAuth() {
  const searchParams = getSearchParams();
  // 请求权限鉴定
  return request
    .get(ApiUrls.CHECK_RESCODE_AUTHORITY, {
      params: {
        resourceCode: searchParams.resCode,
      },
    })
    .then((res) => res && res.result === '0');
}

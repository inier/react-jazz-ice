import { request, apiUrls } from '@/api';

export function getPicCode(username, timestamp) {
  return `${apiUrls.GET_PIC_CODE}?timestamp=${timestamp}&username=${username}`;
}

/**
 * 获取用户信息
 * @param {object} params 参数
 * @returns {promise}
 */
export async function upload(params): Promise<any> {
  const result = await request.post(apiUrls.POST_UPLOAD, params, {
    loading: false,
  });

  return result;
}

import { request, apiUrls } from '@/api';

/**
 * 获取资源列表
 * @param {object} params 参数
 * @returns {promise}
 */
export function getResList(params: object, options: any): Promise<any> {
  return request.get(apiUrls.GET_ADMIN_RES_LIST, params, options);
}

/**
 * 获取用户信息
 * @param {object} params 参数
 * @returns {promise}
 */
export function getUserInfo(): Promise<any> {
  return request.get(apiUrls.GET_USER_INFO, {}, { loading: true });
}

import { request } from 'ice';

export default {
  // 简单场景
  async getUser() {
    return await request('/api/user');
  },

  // 参数场景
  async getRepo(id) {
    return await request(`/api/repo/${id}`);
  },

  // 简单场景
  async getResList() {
    return await request('/api/res/list');
  },

  // 格式化返回值
  async getDetail(params) {
    const data = await request({
      url: '/api/detail',
      params,
    });

    return data.map((item) => {
      return {
        ...item,
        price: item.oldPrice,
        text: item.status === '1' ? '确定' : '取消',
      };
    });
  },
};

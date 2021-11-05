// mock相关

export default {
  // 示例代码
  // 同时支持 GET 和 POST
  '/api/users/1': { result: 0, data: {} },
  '/api/foo/bar': { result: 0, data: {} },

  // 支持标准 HTTP
  'GET /api/profile': { result: 0, data: { avatar: 'https://ice.work/img/logo.png', name: '管理员' } },
  'DELETE /api/users': { result: 0, data: { users: [1, 2] } },

  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ result: 0, data: { id } });
  },
};

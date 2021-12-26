// mock相关
import resList from './resList';
import { userInfo } from './userInfo';

export default {
  // 示例代码
  // 同时支持 GET 和 POST
  '/api/users/1': { result: 0, data: {} },
  '/api/foo/bar': { result: 0, data: {} },
  '/api/res/list': (req, res) => {
    console.log(req);
    setTimeout(() => {
      res.send(JSON.stringify(resList));
    }, 3000);
  },

  // 支持标准 HTTP
  'GET /api/api/profile': { result: 0, data: { ...userInfo, name: 'Admin' } },
  'GET /api/user': { result: 0, data: { ...userInfo, name: 'User' } },

  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ result: 0, data: { id } });
  },
};

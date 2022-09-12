// mock相关
import resList from './resList';
import { userInfo } from './userInfo';

export default {
  // 示例代码
  // 同时支持 GET 和 POST
  '/api/users/1': { result: 0, data: {} },
  '/api/foo/bar': { result: 0, data: {} },
  '/api/system/menuList': resList,

  // 支持标准 HTTP
  'GET /api/profile': (req, res) => {
    const { name, x } = req.query;
    return res.json({ result: 0, data: { ...userInfo, name: `${name}-${x}` } });
  },
  'GET /api/user': { result: 0, data: { ...userInfo, name: 'User' } },

  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ result: 0, data: { id } });
  },
};

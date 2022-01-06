// 发布后的相对根目录
const ROOT = process.env.NODE_ENV === 'development' ? '/api' : '';
const loc = '';
const urls: any = {
  // GET_RESPONSE_CODE: `${loc}/resc/list`, // 获取统一返回码
  GET_ADMIN_RES_LIST: `${loc}/res/list`, // 获取权限列表
  GET_USER_INFO: `${loc}/profile`, // 获取用户信息
};

Object.keys(urls).forEach((key) => {
  let v = urls[key];
  if (v.indexOf('http') > -1) {
    urls[key] = v;
  } else {
    if (v.indexOf('/') > 0) {
      v = `/${v}`;
    }
    urls[key] = `${ROOT}${v}`;
  }
});

export default urls;

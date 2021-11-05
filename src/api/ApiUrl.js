// 发布后的相对根目录
const ROOT = process.env.NODE_ENV === 'development' ? '/api' : '';
const loc = '';
const urls = {
  GET_RESPONSE_CODE: `${loc}/resc/list`, // 获取统一返回码
  CHECK_RESCODE_AUTHORITY: '/resApiEdge/resAPI/check', // 资源验证
  GET_AUTHORIZE_URL: '/wxApiEdge/wxapi/getAuthorizeUrl', // 获取授权链接
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

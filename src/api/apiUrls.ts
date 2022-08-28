// 发布后的相对根目录
const ROOT = process.env.NODE_ENV === 'development' ? '/api' : '';
const loc = '';
const urls: any = {
  // GET_RESPONSE_CODE: `${loc}/resc/list`, // 获取统一返回码
  GET_ADMIN_RES_LIST: `${loc}/system/menuList`, // 获取权限菜单列表
  GET_USER_INFO: `${loc}/profile`, // 获取用户信息
  GET_PIC_CODE: `${loc}/system/picCode`, // 获取图片验证码
  GET_PUBLIC_KEY: `${loc}/system/getkey`, // 获取secretKey
  POST_USER_LOGIN: `${loc}/system/login`, // 密码登录
  GET_LOGIN_OFF: `${loc}/system/loginout`, // 退出登录
  POST_UPLOAD: `${loc}/system/uploadPic`, // 文件上传
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

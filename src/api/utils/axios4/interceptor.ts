/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 * result:0,
 * data:"成功",
 * message:""
 * }
 */
import axios from 'axios';

// 创建axios实例
const service = axios.create({
  // 配置请求超时时间
  timeout: 10000,
  // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
  withCredentials: true,
});

// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截
service.interceptors.request.use((config) => {
  return config;
});

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // 获取接口返回结果
    const res = response.data;
    // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    if (res.result === 0) {
      return res;
    } else if (res.result === -1) {
      // 也可使用router进行跳转
      window.location.href = '/#/login';

      return res;
    } else {
      // 错误显示可在service中控制，因为某些场景我们不想要展示错误
      // Message.error(res.message);
      return res;
    }
  },
  () => {
    console.log('网络请求异常，请稍后重试!');
  },
);

export default service;

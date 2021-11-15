// 开发环境代理配置

module.exports = {
  '/api/mock': {
    // mock api地址
    target: 'http://localhost:3000/mock/12',
    enable: true,
    changeOrigin: true,
    pathRewrite: {
      '^/api/mock': '',
    },
  },
  '/api': {
    target: 'http://ip-api.com/',
    enable: true,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  },
};


// const { createProxyMiddleware } = require('http-proxy-middleware');

// 开发环境代理配置
// module.exports = function (app) {
//   app.use(
//     ['/api/mock'],
//     createProxyMiddleware({
//       // mock api地址
//       target: '//localhost:3000/mock/12',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api/mock': '',
//       },
//     }),
//   );
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: '//ip-api.com/',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '',
//       },
//     }),
//   );
// };


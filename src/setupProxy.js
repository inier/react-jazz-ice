// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

// 开发环境代理配置
module.exports = function (app) {
  app.use(
    ['/api/mock'],
    createProxyMiddleware({
      // mock api地址
      target: '//172.16.192.162:3000/mock/12',
      changeOrigin: true,
      pathRewrite: {
        '^/api/mock': '',
      },
    }),
  );
  app.use(
    '/api/jeecms',
    createProxyMiddleware({
      target: 'https://mall.changan.com.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mall.changan.com.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
  app.use(
    '/api/main',
    createProxyMiddleware({
      target: 'https://mall.changan.com.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
  app.use(
    '/api/member',
    createProxyMiddleware({
      target: 'https://mall.changan.com.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
  app.use(
    '/api/shoppingcart',
    createProxyMiddleware({
      target: 'https://mall.changan.com.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
  app.use(
    '/caecpay/api/ip',
    createProxyMiddleware({
      target: 'https://mall.changan.com.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/caecpay': '/caecpay',
      },
    }),
  );
  app.use(
    '/api/h5',
    createProxyMiddleware({
      target: 'https://mall.changan.com.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};

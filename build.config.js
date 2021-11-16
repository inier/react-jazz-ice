const proxyConfig = require('./src/setupProxy');

module.exports = {
  publicPath: './',
  define: {
    env: process.env.NODE_ENV,
    PUBLIC_URL: '/toxic',
  },
  vite: true,
  eslint: false,
  plugins: [
    [
      'build-plugin-fusion',
      {
        themePackage: '@alifd/theme-design-pro',
      },
    ],
    [
      'build-plugin-moment-locales',
      {
        locales: ['zh-cn'],
      },
    ],
    [
      'build-plugin-css-assets-local',
      {
        outputPath: 'assets',
        relativeCssPath: '../',
      },
    ],
    ['build-plugin-keep-alive'],
    // ['build-plugin-dev-inspector'], // vite模式不支持
  ],
  proxy: {
    '/api/mock': {
      // mock api地址
      target: 'http://localhost:3000/mock/12',
      changeOrigin: true,
      pathRewrite: {
        '^/api/mock': '',
      },
    },
    '/api': {
      target: 'http://ip-api.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};

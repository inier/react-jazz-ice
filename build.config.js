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
  proxy: proxyConfig,
};

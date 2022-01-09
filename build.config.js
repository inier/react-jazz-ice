const proxyConfig = require('./src/setupProxy');

module.exports = {
  store: false,
  auth: false,
  minify: false,
  // tsChecker: true,
  vite: false,
  alias: {
    '@': './src/',
    '@theme': './src/_theme.scss',
  },
  define: {
    PUBLIC_URL: '/toxic',
  },
  router: {
    lazy: true,
    configPath: './src/routes/index.ts',
  },
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
    // [
    //   'build-plugin-css-assets-local',
    //   {
    //     outputPath: 'assets',
    //     relativeCssPath: '../',
    //   },
    // ],
    // ['build-plugin-keep-alive'],
    // ['build-plugin-dev-inspector'], // vite模式不支持
  ],
  webpackPlugins: {
    'webpack.ProvidePlugin': {
      options: {
        'window.store': 'store2',
      },
    },
  },
  proxy: proxyConfig,
};

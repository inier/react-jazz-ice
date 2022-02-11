const proxyConfig = require('./src/setupProxy');
// 主题名称，根据当前项目使用的主题而定
const theme = '@alifd/theme-design-pro';

module.exports = {
  store: false,
  // auth: false,
  minify: false,
  // tsChecker: true,
  // vite: true,
  alias: {
    '@': './src/',
    '@settings': './src/_theme.scss',
    '@theme': theme,
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
        themePackage: theme,
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

const proxyConfig = require('./src/setupProxy');
// 主题名称，根据当前项目使用的主题而定
const theme = '@alifd/theme-design-pro';
const PUBLIC_URL = '/toxic';

/**
 * 是否是开发模式
 */
const isDev = () => {
  const { NODE_ENV } = process.env;
  return NODE_ENV === 'development';
};

module.exports = {
  store: false,
  // auth: false,
  minify: false,
  // tsChecker: true,
  // vite: true,
  alias: {
    '@/': './src/',
    '@settings': './src/_theme.scss',
    '@theme': theme,
  },
  define: {
    PUBLIC_URL,
    // 用于public目录下静态文件中的PUBLIC_URL引入, 如index.html
    STATIC_PUBLIC_URL: isDev() ? '' : PUBLIC_URL,
  },
  router: {
    lazy: true,
    configPath: './src/routes/index.ts',
  },
  publicPath: `${PUBLIC_URL}/`,
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
        'window.RSAUtils': 'RSAUtils',
      },
    },
  },
  proxy: proxyConfig,
};

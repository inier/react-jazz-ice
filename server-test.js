const path = require('path');

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const useragent = require('express-useragent');

const app = express();

// 添加useragent
app.use(useragent.express());

// 启用gzip
app.use(compression());

// 解析 post 请求 参数
// limit:'30000kb'  设置 服务器 接受的 数据 大小限制
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '30000kb',
  }),
);

// log请求地址
app.use('/', (req, res, next) => {
  console.log(`Receive URL: ${req.path} `);
  next();
});

app.use('/res/list', async (req, res, next) => {
  res.send(require('./mock/resList.js'));
  next();
});

app.use('/profile', (req, res, next) => {
  res.send({
    result: '0',
    data: {
      avatar: 'https://ice.work/img/logo.png',
      name: 'JazzKK',
    },
  });
  next();
});

/**
 * 测试服务器代理配置
 */
// const { createProxyMiddleware } = require('http-proxy-middleware');

// //context可以是单个字符串，也可以是多个字符串数组
// const context = ['/'];
// //options可选的配置参数请自行看readme.md文档
// //，通常只需要配置target，也就是你的api所属的域名
// const options = {
//     target: '/',
//     pathRewrite:{
//       '^/app':''
//     },
//     changeOrigin: true
// }
// //将options对象用createProxyMiddleware 封装起来，作为参数传递
// const apiProxy = createProxyMiddleware (options);
// //在测试环境的时候可以不用代理
// app.use(context, apiProxy)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res, next) => {
  // console.log(req.useragent);
  // 处理IE浏览器兼容
  const { browser, version } = req.useragent;
  if (browser === 'IE' && Number(version) <= 11) {
    res.sendFile(path.join(__dirname, 'build', 'ie.html'));
  }
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8008, () => {
  console.log('Running at http://localhost:8008');
});

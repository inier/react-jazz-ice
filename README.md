
## Fusion Design Pro - TS

> 使用 TypeScript，包含大量 UI 区块，比如图表、表单等。

## 使用

```bash
# 安装依赖
$ yarn

# 启动服务
$ yarn start  # visit http://localhost:3333
```

[More docs](https://ice.work/docs/guide/about).

## 目录

```md
├── build/                         # 构建产物
├── mock/                          # 本地模拟数据
│   ├── index.[j,t]s
├── public/
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码路径
│   ├── api                        # 请求服务相关
│   │   ├── services               # 应用级服务层
│   │   │   └── xxx.[j,t]s
│   │   ├── utils                  # 自定义请求封装
│   │   ├── api_urls.[j,t]s        # 请求接口地址集
│   │   ├── index.[j,t]s           # 统一出口
│   │   └── ResponseCode.[j,t]s    # 请求响应错误码集
│   ├── assets                     # 静态资源
│   ├── components/                # 自定义业务组件
│   │   └── Guide/
│   │       ├── index.[j,t]sx
│   │       └── index.module.scss
│   ├── hooks/                     # 自定义Hooks
│   │   └── index.[j,t]s           # 统一出口
│   ├── layouts/                   # 布局组件
│   │   └── BasicLayout/
│   │       ├── index.[j,t]sx
│   │       └── index.module.scss
│   ├── locales/                   # 国际化相关
│   ├── modules                    # 公共业务模块
│   ├── pages/                     # 页面
│   │   ├── index.[j,t]sx          # 统一出口
│   │   └── Home/                  # home 页面，约定路由转成小写
│   │       ├── components/        # 页面级自定义业务组件
│   │       ├── store.[j,t]sx      # [可选] 页面级数据状态
│   │       ├── index.[j,t]sx      # 页面入口
│   │       └── index.module.scss  # 页面样式文件
│   ├── stores/                    # 应用级数据状态
│   │   ├── UIStore.[j,t]s         # 应用级UI相关状态，toast、loading等
│   │   ├── UserStore.[j,t]s       # 应用级User相关状态，token、userInfo等
│   │   ├── xxxStore.[j,t]s        # 其他状态等
│   │   └── index.[j,t]s           # 统一出口
│   ├── configs/                   # [可选] 配置文件
│   │   └── menu.[j,t]s            # [可选] 菜单配置
│   ├── utils/                     # [可选] 工具库
│   ├── config.[j,t]s              # [可选] 环境变量配置文件
│   ├── global.scss                # 全局样式
│   ├── routes.[j,t]s              # 路由配置
│   └── app.[j,t]s[x]              # 应用入口脚本
├── build.json                     # 工程配置
├── README.md
├── package.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.[j,t]s
├── .gitignore
├── .stylelintignore
├── .stylelintrc.[j,t]s
├── .gitignore
└── [j,t]sconfig.json
```

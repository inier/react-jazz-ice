## [Fusion Design Pro - TS](https://fusion.design/mc/detail/728#/form/flow)

> 使用 TypeScript，包含大量 UI 区块，比如图表、表单等。

> [更多物料](https://fusion.design/mc)。

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
├── build/ # 构建产物
├── mock/ # 本地模拟数据
│ ├── index.[j,t]s
├── public/
│ ├── index.html # 应用入口 HTML
│ └── favicon.png # Favicon
├── src/ # 源码路径
│ ├── api # 请求相关配置
│ │ ├── utils # 自定义请求封装
│ │ ├── index.[j,t]s # 统一出口
│ │ ├── api_urls.[j,t]s # 请求接口地址集
│ │ └── response_code.[j,t]s # 请求响应错误码集
│ ├── assets # 静态资源
│ ├── components/ # 自定义业务组件
│ │ └── Guide/
│ │ ├── index.[j,t]sx
│ │ └── index.module.scss
│ ├── hooks/ # 自定义 Hooks
│ │ └── index.[j,t]s # 统一出口
│ ├── layouts/ # 布局组件
│ │ └── BasicLayout/
│ │ ├── index.[j,t]sx
│ │ └── index.module.scss
│ ├── locales/ # 国际化相关
│ ├── modules # 公共业务模块
│ ├── pages/ # 页面
│ │ ├── index.[j,t]sx # 统一出口
│ │ └── Home/ # home 页面，约定路由转成小写
│ │ ├── components/ # 页面级自定义业务组件
│ │ ├── store.[j,t]sx # [可选] 页面级数据状态
│ │ ├── index.[j,t]sx # 页面入口
│ │ └── index.module.scss # 页面样式文件
│ ├── routes/ # 路由配置
│ └── index.[j,t]s # 统一出口
│ ├── services # 应用级服务层
│ │ └── xxx.[j,t]s
│ ├── stores/ # 应用级数据状态
│ │ ├── UIStore.[j,t]s # 应用级 UI 相关状态，toast、loading 等
│ │ ├── UserStore.[j,t]s # 应用级 User 相关状态，token、userInfo 等
│ │ ├── xxxStore.[j,t]s # 其他状态等
│ │ └── index.[j,t]s # 统一出口
│ ├── configs/ # [可选] 配置文件
│ │ └── menu.[j,t]s # [可选] 菜单配置
│ ├── utils/ # [可选] 工具库
│ ├── config.[j,t]s # [可选] 环境变量配置文件
│ ├── global.scss # 全局样式
│ └── app.[j,t]s[x] # 应用入口脚本
├── build.json # 工程配置
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

> 以上结构为推荐结构。stores、services、hooks、components、utils 等目录，语义相同，可以按使用层级单独添加。如某个 store 仅当前页面或板块使用，可以在该 page 目录下创建 stores，用于存放 stores。

## 框架用法

本工程基于[ice 框架](https://ice.work/)，并进行了以下扩展：
[x] 支持 [Webpack](https://webpack.docschina.org/) 5 和 [Vite](https://vitejs.cn/) 2
[x] 支持 SPA、[MPA](https://ice.work/docs/guide/advanced/mpa)，同时支持[服务端渲染 SSR](https://ice.work/docs/guide/advanced/ssr) 以及[静态构建 SSG](https://ice.work/docs/guide/advanced/ssg)
[x] 基于 [ES6+](https://es6.ruanyifeng.com/) 基础库，不兼容 IE11
[x] 基于 [TypeScript](https://www.typescriptlang.org/zh/) 4.5+
[x] 基于 React 17 [文档](https://zh-hans.reactjs.org/) | [Beta](https://beta.reactjs.org/)
[x] 基于 [React Router](https://reactrouter.com/) 5
[x] 采用状态管理方案[Mobx 6](https://zh.mobx.js.org/)
[x] 采用数据请求方案[axios](http://www.axios-js.com/)
[x] 支持页面级 keepAlive 的 [RouteTabs](./src/components/RouteTabs/README.md)
[x] 支持 CSS 预处理器[SCSS](https://sass-lang.com/)
[x] 默认采用 [Fusion Design](https://fusion.design/pc/?themeid=2) UI 库
[x] 支持 Fusion Design 主题可视化配置
[x] 统一菜单和路由配置
[x] 完备的代码质量管理体系

[x] 推荐 React Hooks 解决方案 [ahooks](https://ahooks.js.org/zh-CN)
[x] 推荐 表单方案 [Formily](https://formilyjs.org/zh-CN)

[ ] 待优化权限管理方案
[ ] 待支持.env 环境变量配置方案
[ ] 待支持 [Tailwind CSS](https://www.tailwindcss.cn/)
[ ] ...

### 路由配置

基础配置参考 ice 的[路由配置](https://ice.work/docs/guide/basic/router).  
框架在这基础上做了扩展, 将侧边栏导航和选项卡的配置整合进 `pageConfig` 配置中.

```ts
type ICustomRouterConfig = IRouterConfig & {
  pageConfig?: {
    title?: string; // 标题
    scrollToTop?: boolean; // 配置页面准入权限角色列表
    auth?: string[]; // 配置页面准入权限角色列表
    errorBoundary?: boolean; // 默认 false，进入页面时是否要滚动到顶部
    icon?: string | ReactElement; // 图标. 侧边栏和选项卡都会用到
    fixed?: boolean; // 是否固定选项卡. RouteTabs 组件配置参数
    keepAlive?: boolean; // 是否缓存页面. RouteTabs 组件配置参数
    closeTips?: boolean | ((callbackFn: () => boolean) => void); // 是否需要关闭提示. RouteTabs 组件配置参数
    locale?: string; // 自定义菜单的国际化 key
    hideInMenu?: boolean; // 在菜单中隐藏自己和子节点
    hideInBreadcrumb?: boolean; // 在面包屑中隐藏
    hideChildrenInMenu?: boolean; // 会把这个路由的子节点在 menu 中隐藏
    flatMenu?: boolean; // 隐藏自己，并且将子节点提升到与自己平级
    target?: string; // 指定外链打开形式，同a标签
    [key: string]: any;
  };
};
```

### 样式方案

项目样式使用 Fusion Design 主题包统一管理, 通过配置文件`src/_theme.scss`, 可自定义项目级通用的 design token. 主题包样式的[覆盖方案参考](https://ice.work/docs/plugin/list/fusion).

> css modules 方案要注意, 文件名称需要加 `.module.[c|sa|le]ss` 的后缀, 和 umijs 的样式方案不同.

#### iconfont 图标

项目要使用 Fusion Design 主题包统一管理图标, 提供了组件 `Icon` 组件来使用 `iconfont` 字体图标. 也可以自定义图标，在 `public.html` 页面注入 `iconfont` 的文件, 页面通过组件可以直接使用.

### 数据请求

基础方案参考 ice 的[数据请求](https://ice.work/docs/guide/basic/request/).  
在此基础上封装了 ice 提供的 `useRequest` 方法. (不使用 ahooks 的 useRequest, 引包的时候需要注意路径).

### 数据 Mock

参考 ice 文档的 [数据 Mock](https://ice.work/docs/guide/advanced/mock)

### 状态管理

本项目使用 `Mobx` 方案, 使用方法参考[文档](https://zh.mobx.js.org/README.html).

### Hooks

Hooks 基础引用 `ahooks@3.x`, 参考[文档](https://ahooks.js.org/zh-CN).  
使用的时候统一引用 `import { xxx } from '@/hooks'`.  
提供的其他 hooks, 请参考对应 hooks 下的 README.md 文件, 或者文档注释.

### 工具库

使用方式, `import { xxx } from '@/utils'`.  
具体说明参考工具函数的 README.md 文件, 或者文档注释.

### 缓存管理

缓存集成 `store2`.
使用方式, `import { storage } from '@/utils'`.  
具体使用方式参考 `src/utils/storage.ts` 的文档注释.

### 静态资源处理

参考 ice 的[静态资源处理](https://ice.work/docs/guide/basic/assets).

### 多语言

基础方案使用 `react-intl`, 使用方法参考[文档](https://formatjs.io/docs/react-intl).  
设置全局语言方案和读取全局语言方案使用 `import { getLocale, setLocale } from '@/utils'`.

### 多页签

使用方法参考 `src/components/RouteTabs/README.md` 文档.

### 环境配置

参考 ice 文档的 [环境配置](https://ice.work/docs/guide/basic/config)

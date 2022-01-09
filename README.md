[TOC]

# React 模板工程

本模板工程基于[Fusion Design Pro - TS](https://fusion.design/mc/detail/728#/form/flow)，用于中后台项开发。使用 TypeScript，包含大量 UI 区块，比如图表、表单等，可根据实际情况自行取舍。

> [更多物料](https://fusion.design/mc)。

## 技术特性

本工程基于[ice 框架](https://ice.work/)进行扩展，主要技术特性如下：
[x] 支持 [Webpack](https://webpack.docschina.org/) 5 和 [Vite](https://vitejs.cn/) 2
[x] 支持 SPA、[MPA](https://ice.work/docs/guide/advanced/mpa)，同时支持[服务端渲染 SSR](https://ice.work/docs/guide/advanced/ssr) 以及[静态构建 SSG](https://ice.work/docs/guide/advanced/ssg)
[x] 基于 [ES6+](https://es6.ruanyifeng.com/) ，不兼容 IE11
[x] 基于 [TypeScript](https://www.typescriptlang.org/zh/) 4.5+
[x] 基于 React 17 [文档](https://zh-hans.reactjs.org/) | [Beta](https://beta.reactjs.org/)
[x] 基于 [React Router](https://reactrouter.com/) 5
[x] 采用状态管理方案[Mobx 6](https://zh.mobx.js.org/)
[x] 采用数据请求方案[axios](http://www.axios-js.com/)
[x] 支持页面级 keepAlive 的 [RouteTabs](./src/components/RouteTabs/README.md)
[x] 支持 CSS 预处理器[SCSS](https://sass-lang.com/)
[x] 公共 SCSS mixins 支持
[x] 默认采用 [Fusion Design](https://fusion.design/pc/?themeid=2) UI 库
[x] 支持 Fusion Design 主题可视化配置
[x] 统一菜单和路由配置
[x] Eslint / Stylelint / Prettier 等代码质量体系
[x] Markdownlint 规范 [详情](https://github.com/ruanyf/document-style-guide/) [规则](https://github.com/hustcc/lint-md/tree/master/packages/lint-md)
[x] 代码提交日志规范
[x] 推荐 React Hooks 解决方案 [ahooks](https://ahooks.js.org/zh-CN)
[x] 推荐 表单方案 [Formily](https://formilyjs.org/zh-CN)

[ ] 待优化权限管理方案
[ ] 待支持.env 环境变量配置方案
[ ] 待支持 [Tailwind CSS](https://www.tailwindcss.cn/)
[ ] ...

更多特性，赶快体验！[More docs](https://ice.work/docs/guide/about)。

## 依赖环境

- node 12+
- babel 7+
- webpack 5
- React 17+
- node-sass 4+
- [jest](https://ice.work/docs/guide/advanced/test#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)

### 安装

默认使用 yarn，npm 可能无法正常安装 node-sass。若 yarn 安装 node-sass 失败，可通过 cnpm 单独安装 node-sass。

```plain
> yarn
```

## 使用

```bash
# 安装依赖
$ yarn

# 启动服务，禁用mock
$ yarn start  # visit http://localhost:8888
# 开启mock
$ yarn start:mock  # visit http://localhost:8889

# 生产环境打包
$ yarn build
# 生产环境打包（带体积分析）
$ yarn build -- --analyzer
# 通过source-map-explorer查看体积，需要开启sourceMap
$ yarn analyze
# 生产环境打包（查看构建耗时）
$ yarn build --build-speed

# 执行测试
$ yarn test

# 命令行提交，类型选择
$ yarn commit
# changlog 及版本管理
$ yarn version
```

> 发布时，将 build 目录下的文件发布到对应 node 服务器上即可；该环节推荐通过搭建 CI/CD 平台来自动完成。
> 推荐编辑器 [Visual Studio Code](https://code.visualstudio.com/)，如果出现 vscode 占用系统资源 100%的情况，请检查是否安装了 SCSS IntelliSense、IntelliSense for CSS class names in HTML 插件，若存在，请关闭这类插件。

## 项目规范

### 目录

```plain
├── build/                        # 构建产物
├── mock/                         # 本地模拟数据
│ └── index.[j,t]s
│
├── doc/                          # 存放文档，如规范等
├── public/                       # 静态文件
│ ├── favicon.ico                 # Favicon
│ ├── index.html                  # 应用入口 HTML，可引入第三方js等
│ ├── ie.html  		              	# ie及低版本浏览器兼容提示
│ ├── logo*.png  		              # Web App应用图标，默认包括1x和3x两种尺寸
│ ├── manifest.json		  	        # Web App配置文件
│ └── robots.txt		    	        # robots协议配置文件
│
├── src/                          # 源码路径
│ ├── api                         # 请求相关配置
│ │ ├── utils                     # 自定义请求封装
│ │ ├── index.[j,t]s              # 统一出口
│ │ ├── apiUrls.[j,t]s            # 请求接口地址集
│ │ └── responseCode.[j,t]s       # 请求响应错误码集
│ │
│ ├── assets                      # 静态资源
│ ├── components/                 # 通用组件集合，与业务无关
│ │ └── Xxx/                      # Xxx组件
│ │ │ ├── index.[j,t]sx
│ │ │ ├── index.scss              # 组件的scss文件，按需选择
│ │ │ └── index.module.scss       # 组件的scss文件，开启css-modules，按需选择
│ │ └── index.[j,t]s 	            # 组件的export
│ │
│ ├── constants/                  # 常量目录（可选）
│ │ └── index.[j,t]s              # 统一出口
│ │
│ ├── hooks/                      # 自定义 Hooks
│ │ └── index.[j,t]s              # 统一出口
│ │
│ ├── layouts/                    # 布局组件，用于路由分层
│ │ └── BasicLayout/
│ │ │ ├── index.[j,t]sx
│ │ │ └── index.module.scss
│ │ └── index.[j,t]s        	  	# 布局的统一export
│ │
│ ├── locales/                    # 国际化相关
│ ├── modules/                    # 业务组件集合(与业务强相关)
│ │ └── Xxx/                      # Xxx组件
│ │
│ ├── pages/                      # 页面级组件
│ │ ├── index.[j,t]sx # 统一出口
│ │ ├── Xxx/                      # xxx 页面，约定路由转成小写
│ │ │ ├── components/             # 页面级自定义组件
│ │ │ ├── store.[j,t]sx           # [可选] 页面级数据状态
│ │ │ ├── index.[j,t]sx           # 页面入口
│ │ │ └── index.module.scss       # 页面样式文件
│ │ └── index.[j,t]s        	  	# 页面集合的统一export（可选）
│ │
│ ├── routes/                     # 路由集中配置
│ │ └── index.[j,t]s              # 统一出口
│ │
│ ├── services                    # 应用级服务层
│ │ └── xxx/                      # xxx业务域目录
│ │   └── index.[j,t]s            # 统一出口
│ │
│ ├── stores/                     # 应用级状态
│ │ ├── UIStore.[j,t]s            # UI状态，toast、loading 等
│ │ ├── UserStore.[j,t]s          # User状态，token、userInfo 等
│ │ ├── XxxStore.[j,t]s           # 通用业务状态
│ │ └── index.[j,t]s              # 统一出口
│ │
│ ├── utils/                      # [可选] 工具库
│ │ ├── xxx.[j,t]s                # 各辅助工具
│ │ └── index.[j,t]s	            # 辅助工具类的统一export
│ │
│ ├── _theme.scss                 # 主题配置相关
│ ├── app.[j,t]s[x]               # 应用入口脚本
│ ├── config.[j,t]s               # [可选] 环境变量配置文件
│ ├── global.scss                 # 全局样式
│ ├── setupProxy.js 	        		# 全局开发代理配置
│ └── typings.d.ts                # ts类型定义
├── tests/          		  	      # 存放测试用例
│
├── .commitlintrc.js	         	  # 提交日志规范相关
├── .editorconfig                 # 编辑器配置文件
├── .eslintignore     	     		  # eslint 忽略配置，类似 .gitignore
├── .eslintrc.[j,t]s       	      # eslint 配置文件
├── .gitattributes     		        # 指定由 git 使用的文件和路径的属性
├── .gitignore          	        # git 提交忽略配置文件
├── .lintmdrc           	        # markdownlint 配置文件
├── .prettierignore     		      # prettier 忽略配置，类似 .gitignore
├── .prettierrc.js   	  		      # prettier 配置文件
├── .stylelintignore	  	        # stylelint 忽略配置，类似 .gitignore
├── .stylelintrc.js			          # stylelint 配置文件
├── .yarnrc                	      # yarn 配置文件
├── build.config.js               # 工程配置
├── [j,t]sconfig.json        	    # js/ts语言的功能选项
├── lint-staged.config.js    	    # lint-staged 配置文件
├── package.json		           	  # 项目基本信息、依赖及脚本命令等
├── README.md
├── server.js       	  		      # 本地构建服务器
├── server.test.js  	  	        # 本地开发测试服务器
└── yarn.lock            	        # yarn 依赖包版本lock
```

> 以上为推荐结构。stores、services、hooks、components、utils 等目录，语义相同，可以按使用层级单独添加。如某个 store 仅当前页面或板块使用，可以在该 page 目录下创建 stores，用于存放 stores。
> 以上未提及的文件夹或文件，不用关注。
> 以上各目录中的统一出口 不包括第三方组件，且未使用的组件应避免在此导出。

### 命名规范

详情参见[项目级规范](doc/前端开发规范.md)。

### 组件划分

规范中将组件划分为通用组件和业务组件两大类。

#### 通用组件（复用级别：框架级）

通用组件也叫**展示型**组件，与具体业务解耦，只负责接收指定格式的数据进行 UI 展示。可在大多数项目中通用。约定存放在**`src/components`**目录中。

为便于沉淀通用组件库，并提高其可维护性。约定将通用组件划分以下 4 类：

- **basis**：基础型组件，构成网页的基本元素。例如图标、按钮等；
- **layout**：布局型组件，用于组织页面布局，例如网格系统、两侧留白、水平留白等；
- **block**：区块/模块型组件，具有独立的功能，低于页面级的组件，例如支持筛选和分页的表格，可以嵌套；
- **template**：模板型组件，可重用的复杂 UI 结构，一般为页面级组件，例如支付成功页等。

#### 业务组件（复用级别：项目级）

业务组件是指与项目紧密相关的组件，一般会捆绑具体的数据或状态，也叫**容器型**组件。分为以下 3 类：

- **modules（`src/modules`）**：功能组件，用于归类项目开发中，无法沉淀为框架级的、但项目内可复用的功能块，一般由**数据或状态** + **通用组件**组成。例如购物车模块、用户登录等。

- **pages （`src/pages`）**：页面组件，用于归类按页面流划分的页面组件，一般由**项目级 modules** + **通用组件（布局类组件等）**组成。

- **layouts（`src/layouts`）**：结构组件，主要用于对整个项目的页面结构做归类，抽出公共的页面级容器组件。例如可定义：

  ```
  - BasicLayout：主布局，带有一级导航、侧边导航、Tabs等。
  - BlankLayout：空白布局，100%高的容器，用于404 等特殊页面布局等。
  - UserLayout：登录/注册/忘记密码等。
  ```

  > 当然，也可以根据业务需求划分，如 GoodDetailLayout 商品详情模块。其原则是可重用，便于组织页面。

### 路由配置

基础配置参考 ice 的[路由配置](https://ice.work/docs/guide/basic/router)。  
框架在这基础上做了扩展, 将侧边栏导航和选项卡的配置整合进 `pageConfig` 配置中。

```ts
type ICustomRouterConfig = IRouterConfig & {
  pageConfig?: {
    title?: string; // 标题
    scrollToTop?: boolean; // 配置页面准入权限角色列表
    auth?: string[]; // 配置页面准入权限角色列表
    errorBoundary?: boolean; // 默认 false，进入页面时是否要滚动到顶部
    icon?: string | ReactElement; // 图标，侧边栏和选项卡都会用到
    fixed?: boolean; // 是否固定选项卡，RouteTabs 组件配置参数
    keepAlive?: boolean; // 是否缓存页面，RouteTabs 组件配置参数
    closeTips?: boolean | ((callbackFn: () => boolean) => void); // 是否需要关闭提示， RouteTabs 组件配置参数
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

> 设置层级路由时，仅第一级路由的 path 需要添加"/"。即所有包含在 children 中的 path 都不要添加'/'，否则会应先 title 的读取。

### 字体图标

项目要使用 Fusion Design 主题包统一管理图标，提供了组件 `Icon` 组件来使用 `iconfont` 字体图标。增加新图标：先使用[阿里巴巴 iconfont](http://www.iconfont.cn)库来管理项目图标。然后在 Fusion Design 主题管理站点中导入对应的图标即可，不需要单独引入 iconfont.css。

### 数据请求

基础方案参考 ice 的[数据请求](https://ice.work/docs/guide/basic/request/)。
在此基础上封装了 ice 提供的 `useRequest` 方法。(不使用 ahooks 的 useRequest，引包的时候需要注意路径)。

### 数据 Mock

参考 ice 文档的 [数据 Mock](https://ice.work/docs/guide/advanced/mock)

### 状态管理

本项目使用 `Mobx` 方案，使用方法参考[文档](https://zh.mobx.js.org/README.html)。

### Hooks

Hooks 基础引用 `ahooks@3.x`，参考[文档](https://ahooks.js.org/zh-CN)。
使用的时候统一引用 `import { xxx } from '@/hooks'`。
提供的其他 hooks，请参考对应 hooks 下的 README.md 文件，或者文档注释。

### 工具库

使用方式，`import { xxx } from '@/utils'`。
具体说明参考工具函数的 README.md 文件，或者文档注释。

### 缓存管理

缓存集成 `store2`。
使用方式，`import { storage } from '@/utils'`。
具体使用方式参考 `src/utils/storage.ts` 的文档注释。

### 静态资源处理

参考 ice 的[静态资源处理](https://ice.work/docs/guide/basic/assets)。

### 多语言

基础方案使用 `react-intl`，使用方法参考[文档](https://formatjs.io/docs/react-intl)。
设置全局语言方案和读取全局语言方案使用 `import { getLocale, setLocale } from '@/utils'`。

### 多页签

使用方法参考 `src/components/RouteTabs/README.md` 文档。

### 环境配置

参考 ice 文档的 [环境配置](https://ice.work/docs/guide/basic/config)

### 代码检查

本工程中采用的检查工具包括：

- [**ESLint**](./doc/ESlint+Prettier配置.md)：用于检查 js 的逻辑错误；
- [**Prettier**](./doc/ESlint+Prettier配置.md)：用于格式化 js 的格式；
- [**Stylelint**](./doc/Stylelint配置.md)：用于检查 css、scss 等样式的语法和书写等。

##### ESLint 禁用检查

http://eslint.cn/docs/user-guide/configuring#disabling-rules-with-inline-comments

##### Stylelint 禁用检查

跟 eslint 类似，通过 `stylelint-disable` 注释来局部禁用某一项规则。通过 `stylelint-enable` 可以把之前忽略的规则重新开启。一定要注意，只 enable 对应的规则，形成呼应：

```css
<style>
    .classA {
        /* stylelint-disable declaration-block-no-duplicate-properties */
        transition-property: transform;
        transition-property: transform, -webkit-transform;
        /* stylelint-enable declaration-block-no-duplicate-properties */
    }
</style>
```

## 开发相关

### 开发须知

- 开发前先根据页面梳理组件，并对组件分级；做好 store 划分，提取公共数据处理逻辑。
- 通过@、@/components 等别名来引入文件。
- 推荐通过各类目录下的 index.js 统一出口。便于对该目录下的资源或组件进行统一注册、替换和添加描述备注等，提高可维护性。
- 尽量做到页面均由**布局组件**+ **通用组件/项目级功能组件**组成，不建议使用原子标签（div、span 等）。

### 修改入口页标题

如果要修改网页标题，请修改 public/index.html 中的<title>标签内容。
还可替换 favicon.ico 为自己的 ico。
manifest.json 中的信息也需一并修改。

### 使用全局别名

已定义以下全局别名：`@`代表 src 目录、`@theme`代表当前项目的主题配置文件`_theme.scss`。主题包在 build.config.js 中配置;

```js
// build.config.js
plugins: [
  [
    'build-plugin-fusion',
    {
      themePackage: '@alifd/theme-design-pro',
    },
  ],
  ...
]
```

> 使用别名，scss 名称@import 时需要写完整，文件名中的\_ 和 .scss 后缀名不能少。
> 使用第三方库的 css 时，可以通过`~`引入或写全`node_modules`的路径。

### 组件 Import 顺序

统一编写习惯，方便团队成员形成统一的“表达”，减轻代码阅读负担。推荐顺序为：

- react 基础库：react、react-dom、react-router-dom 等
- 通用基础库：prop-types、classnames、lodash-es、mobx、mobx-react 等
- 第三方组件库：@alifd/next 等，库附带的样式文件跟随其后
- 项目级组件：@/components/xxx
- 页面级组件：./components/xxx
- 项目级工具类：@/utils/xxx
- 页面样式文件：css、scss 文件，注意引入顺序，按影响程度引入，影响最直接的放在最后
- 图片、json 等静态资源，比较多时可考虑单独的文件集中导入/导出管理

> webpack 生产打包时，scss 的顺序是按照代码执行的顺序，谁先 import 就先打包谁。

### 设计与开发协同

详情参见[UI 设计与前端协同](https://zhuanlan.zhihu.com/p/158206021)。

### 样式方案

项目样式使用 Fusion Design 主题包统一管理，通过配置文件`src/_theme.scss`，可自定义项目级通用的 design token。主题包样式的[覆盖方案参考](https://ice.work/docs/plugin/list/fusion)。

#### 定义 SCSS 变量

项目开发中，对于在主题包之外的公共特性，如颜色、字号等，统一定义到`src/_theme.scss`文件中，以便于后期维护和管理。注意命名规范和分组。

```scss
// ./src/_theme.scss
$modal-color: #f33;

// 组件的xxx.scss
@import '@theme'; //引入路径根据组件scss文件位置进行修正
.content {
  color: $modal-color;
}
```

#### 使用 SCSS mixins

脚手架默认引入了一些常用的 mixins，使用方法参考：https://github.com/inier/mixins。

```scss
@import '@theme'; //引入路径根据组件scss文件位置进行修正

/*-------- 极细边框 --------*/
// 上、右、下、左边框
.border-t {
  @include onepx-scale(#eee, top, after, 2px);
}

.border-r {
  @include onepx-scale(#eee, right, after, 2px);
}
```

此外，也可以在 `src/_theme.scss` 文件中自定义 mixins。

#### 不开启 CSS-Module

css 样式可以选择是否开启 CSS-Module 功能，先介绍不开启的方式。

第 1 步：样式文件命名为 xxx.scss;

```scss
.content {
  padding: 10px;
  .logo {
    width: 40px;
  }
}
```

第 2 步：在 jsx 中引入时使用`import './xxx.scss';`

```js
import './xxx.scss';
...
<main className="content">
	<div className="logo"></div>
</main>
```

> 未开启 CSS-Module 功能，需要注意避免各组件间的样式冲突，推荐 BEM 命名规范，用法自行搜索。

#### 开启 CSS-Module 功能

css modules 方案要注意，文件名称需要加 `.module.[c|sc|le]ss` 的后缀。

第 1 步：样式文件命名为 xxx.module.scss;

```scss
.content {
  padding: 10px;
  .logo {
    width: 40px;
  }
}
```

第 2 步：在 jsx 中引入时使用 `import styles from './xxx.module.scss';`

```js
...
import styles from './xxx.module.scss';
...
<main className={styles.content}>
	<div className={styles.logo}></div>
</main>
```

> 开启 CSS-Module 功能后，将不在支持直接用引号引入该文件的样式；
>
> 如果要使用全局样式，请在样式文件中使用 :global，并在引用时，使用字符串而不是变量应用。

样式继承：开启 CSS-Module 功能后，样式继承请使用[如下方法](https://github.com/css-modules/css-modules#dependencies)。

### 配置 API 调用接口

在本地开发时，前端调用的接口都是跨域的，需要进行代理。将相对路径配`./src/api/apiUrls.js`中即可。

```
// ./src/api/apiUrls.js
const urls = {
    ...
    POST_LOGIN: '/main/login',
    GET_RESPONSE_CODE: '/resc/list'
    ...
}
```

> API 接口命名采用全大写字母，下划线拼接，建议以对应的提交方式`GET`和`POST`等冠名，以便直观的显示。

### 配置开发环境代理

在`src/setupProxy.js`中参照一下配置：

```js
module.exports = {
  '/api/mock': {
    // mock api地址
    target: 'http://localhost:3000/mock/12',
    changeOrigin: true,
    pathRewrite: {
      '^/api/mock': '',
    },
  },
  ...
};
```

> 具体代理规则，请先到接口通用处理逻辑中根据自己接口返回结果的格式情况，进行修改。

这样配置后所有带有`/api`的接口请求都会被代理到`http://localhost`。具体用法请参考[`http-proxy-middleware`组件的官方用法](https://github.com/chimurai/http-proxy-middleware)。

### mobx 开发相关

优先使用最新版本的 mobx6，该版本采用 Proxy 对象，部分浏览器不支持。对兼容性有要求的可以降低到 mobx3、或 mobx4（支持 es5）。详情请参考[mobx 开发手册](https://zh.mobx.js.org/)。

##### mobx 开启严格模式

mobx 开启严格模式，必须使用@action 来修改数据

```js
// mobx6，匹配mobx-react7.x  // https://zh.mobx.js.org
// mobx5，匹配mobx-react6.x，// https://cn.mobx.js.org/refguide/api.html  +  https://blog.csdn.net/smk108/article/details/83185745
configure({
  enforceActions: 'observed',
});

// mobx4，匹配mobx-react5.x
configure({
  enforceActions: true,
});

// mobx3及以下，匹配mobx-react4.x
useStrict(true);
```

> 注意与之搭配的 mobx-react 库。

### 推荐库

详情请见[推荐库](doc/推荐库.md)。

### 低版本浏览器兼容

详情参见[低版本浏览器兼容](doc/低版本浏览器兼容.md)。

## 代码提交

### 提交时自动格式化

> 只有使用 Git 作为代码服务器时有效

使用以下插件 husky lint-staged prettier 实现在提交代码时，自动进行格式化
To format our code whenever we make a commit in git, we need to install the following dependencies:

### 规范提交记录

使用一个规范的提交记录是很有必要的，这不仅让多人开发中的参与者能更好地了解项目的迭代历史和进程，也能在出现问题时快速定位，找到问题代码的提交记录。

在提交代码时，应遵守以下规范：

- 修改的文件如果涉及多个板块，应单独先提交。

- 规范提交信息格式：<type>(<scope>): <subject> ,具体参考[提交记录规范指南](doc/提交日志规范.md)。例如:

```plain
    fix(发票信息页面):修改返回字段。
    feat(SingleInput组件):扩展xxx功能，增加size属性用于设置输入框高度，默认为md [44px]，目前支持lg [54px]
    chore: 新增scss支持（支持 scss 并兼容css-modules）
```

### 自动生成更新说明（待更新）

此外，还可以使用工具根据提交记录自动生成更新说明 (CHANGELOG)，免去手动更新的痛苦，也方便用户了解每次更新的具体内容。具体参考[更新说明规范指南](doc/分支及版本发布规范.md)。

## Code Review

CodeReview 的目的是提升代码质量，尽早发现潜在缺陷与 BUG，降低修复成本，同时促进团队内部知识共享，帮助更多人更好地理解系统，这也是帮助新人成长最快的方式之一。详情参考[CodeReview 规范](doc/CodeReview规范.md)。

参考文章：

https://www.zhihu.com/question/41089988?sort=created

https://blog.csdn.net/uxyheaven/article/details/49773619

http://www.cnblogs.com/cnblogsfans/p/5075073.html

## 附录

### 国际化方案

国际化根据场景主要分为组件国际化、日期国际化、内容国际化。

- **组件国际化**

  很多 UI 框架或组件自身已提供国际化方案，可以参考使用，如[Fusion Design UI](https://fusion.design/component/doc/107)。

- **日期国际化**

  对于日期来说，可以借助 [moment](https://github.com/moment/moment) 库，其自带国际化相关能力。目前社区比较主流的解决方案有以下两种：

  方法一：

  ```js
  const webpack = require('webpack');

  module.exports = {
    // ...
    plugins: [
      // 打包指定需要的语言文件
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|ja/),
    ],
  };
  ```

  方法二：

  ```js
  const webpack = require('webpack');

  module.exports = {
    // ...
    plugins: [
      // 只打包有过引用的语言文件，应用中需要添加如：`import 'moment/locale/zh-cn';`
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
  };
  ```

- **内容国际化**

  主流的内容国际化方案有：

  [kiwi](https://github.com/nefe/kiwi) [有配套的 vscode 工具，持续关注]

  [react-intl](https://github.com/yahoo/react-intl) [yahoo] \*

  [react-intl-universal](https://github.com/alibaba/react-intl-universal) [alibaba]

  [react-i18next](https://react.i18next.com/) [i18next.js]

  [i18n-pick](https://github.com/ProtoTeam/i18n-pick) [蚂蚁金服团队]

  [react-i18n](https://juejin.im/post/5c24a09d5188252a9412fabf) [腾讯 webnovel 团队，暂未开源]

### 开发规范

关于工程目录介绍和代码规范等。

[前端开发规范](./doc/前端开发规范.md)

### bug 记录

记录各种 bug。

[bug 记录](./doc/bug记录.md)

### 踩坑日记

存放各种坑及填坑方法。

[踩坑日记](./doc/踩坑日记.md)

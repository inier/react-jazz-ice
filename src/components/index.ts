// 组件的统一出口

/*
 * basis 基础型组件，构成网页的基本元素。例如图标、按钮等。
 */
import Authorized from './AuthorizedRoute';

// const { AuthorizedRoute } = Authorized;
// export { AuthorizedRoute };

export { default as Link } from './Link';
export { default as Text } from './Text';

/*
 * layout 布局型组件，用于组织页面布局，例如网格系统、两侧留白、水平留白等。
 */
// 错误边界
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as UnAuth } from './UnAuth';
export { default as NotFound } from './NotFound';
export { default as PageContainer } from './PageContainer';

/*
 * block 区块/模块型组件，具有独立的功能，低于页面级的组件，例如支持筛选和分页的表格，可以嵌套。
 */

/*
 * template 模板型组件，可重用的复杂 UI 结构，一般为页面级组件，例如支付成功页等。
 */

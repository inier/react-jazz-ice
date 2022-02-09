import { ICustomRouterConfig } from '../typing';

import joinPath from './joinPath';

// 拼接路由
export function formatRoutes(routes: ICustomRouterConfig[], parentPath?: string) {
  return routes.map((item) => {
    const routeParams: ICustomRouterConfig = {};

    if (item.path) {
      const routePath = joinPath(parentPath || '', item.path);
      routeParams.path = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
    }

    if (item.children) {
      routeParams.children = formatRoutes(item.children, routeParams.path || item.path);
      // Be careful that `children` takes priority!!!
    } else if (item.component) {
      // copy by reference, for `component` is functional.
      const itemComponent = item.component as any;
      itemComponent.pageConfig = Object.assign({}, itemComponent.pageConfig, { componentName: itemComponent.name });
    }

    return {
      ...item,
      ...routeParams,
    };
  });
}

/** 扁平化所有路由 */
export const deepFlattenRoutes = (routes, parentPath = '/') => {
  return [].concat(
    ...routes.map((r: any) => {
      const absolutePathRegex = /^\//;
      const isAbsolutePath = absolutePathRegex.exec(r.path);
      const path = isAbsolutePath ? r.path : `${parentPath}/${r.path}`;

      const temp = { ...r, path };
      delete temp.children;

      if (Array.isArray(r.children)) {
        return [temp].concat(deepFlattenRoutes(r.children, path));
      } else {
        return [temp];
      }
    }),
  );
};

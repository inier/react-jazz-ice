/* eslint-disable no-param-reassign */
import { makeAutoObservable, observable, action, computed } from 'mobx';
import { apiUrls, responseCode } from '@/api';
import { formatPath, isAbsolutePath, getUrl, jsonParse } from '@/utils';

// 菜单项
interface IMenuItem {
  name?: string;
  key?: string;
  icon?: string;
  path?: string;
  external?: boolean;
  url?: string;
  loadUrl?: string[];
  loadResUrl?: string[];
  topKey?: string;
  topName?: string;
  topPath?: string;
  parentKey?: string;
  parentPath?: string;
  children?: object[] | undefined;
}

// 资源项
interface IResItem {
  resourceName?: string;
  resourceCode?: string;
  resourceList?: object[];
  extras?: string;
}

/**
 * 菜单状态
 */
class MenuStore {
  rootStore: any;

  // 用于从resList中筛选指定的资源列表
  filterKey = 'isTopMenu';
  // 资源列表
  @observable resList: IResItem[] = [];
  // 顶部菜单当前选择项
  @observable headerMenuCurrent = '';
  // 侧边菜单当前选择项
  @observable asideMenuCurrent = '';

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  // 顶部菜单
  @computed get headerMenuConfig() {
    const tResult: IMenuItem[] = [];

    if (this.resList.length) {
      let tData: any = [];
      tData = this.resList.map((item) => {
        const { resourceList, ...rest } = item;

        if (!resourceList) {
          return null;
        }

        return rest;
      });

      for (let i = 0; i < tData.length; i++) {
        const item = tData[i];
        if (!item) {
          continue;
        }
        const { resourceName, resourceCode, extras, ...rest } = item;
        const tExtras = jsonParse(extras, resourceName, this.jsonParseErrorCatch);

        if (tExtras) {
          tResult.push({
            name: resourceName,
            key: resourceCode,
            icon: tExtras.icon || '',
            path: `${formatPath(tExtras.routePath)}?type=top`,
            external: isAbsolutePath(tExtras.routePath),
            loadResUrl: tExtras.loadUrl || [],
            ...rest,
          });
        }
      }
    }

    console.log('headerMenuConfig:', tResult);
    return tResult;
  }

  // 侧边菜单
  @computed get asideMenuConfig() {
    const tResult: IMenuItem[] = [];

    if (this.headerMenuCurrent && this.resList.length) {
      const tData: IResItem | undefined = this.resList.find((item: any) => {
        return item.extras.routePath === this.headerMenuCurrent;
      });

      if (tData?.extras && tData?.resourceList) {
        const tResList: IResItem[] = tData.resourceList;
        const topExtras = jsonParse(tData.extras, tData.resourceName);

        // 一级菜单
        if (topExtras) {
          tResList.forEach((res) => {
            const { resourceName, resourceCode, resourceList, extras, ...rest } = res;
            const tExtras = jsonParse(extras, `${tData.resourceName} / ${resourceName}`);

            // 二级菜单
            if (tExtras) {
              const pathLevel2 = formatPath(tExtras.routePath);
              const tRes: IMenuItem | undefined = {
                topKey: tData.resourceCode,
                topPath: topExtras.routePath,
                key: resourceCode,
                name: resourceName,
                icon: tExtras.icon || '',
                path: pathLevel2,
                external: isAbsolutePath(tExtras.routePath),
                children: [],
                ...rest,
              };

              if (resourceList) {
                resourceList.forEach((item: IResItem) => {
                  const {
                    resourceName: itResourceName,
                    resourceCode: iResourceCode,
                    extras: iExtras,
                    ...restProps
                  } = item;
                  const iExtrasT: any = jsonParse(
                    iExtras,
                    `${tData.resourceName} / ${resourceName} / ${itResourceName}`,
                  );

                  // 三级菜单
                  if (iExtrasT && tRes.children) {
                    tRes.children.push({
                      parentKey: resourceCode,
                      parentPath: pathLevel2,
                      key: iResourceCode,
                      name: itResourceName,
                      icon: iExtrasT.icon || iExtrasT.routePath || '',
                      path: formatPath(iExtrasT.routePath),
                      external: isAbsolutePath(tExtras.routePath),
                      url: getUrl(iExtrasT.url),
                      ...restProps,
                    });
                  }
                });
              }

              tResult.push(tRes);
            }
          });
        }
      }
    }

    console.log('asideMenuConfig:', tResult);
    return tResult;
  }
  // AppRouter的路由表
  @computed get appRoutes() {
    const tResult: IMenuItem[] = [];

    this.resList.forEach((res: IResItem) => {
      if (res?.resourceList) {
        const { extras: resExtras, resourceName: tResourceName } = res;
        const tExtras = jsonParse(resExtras, tResourceName, this.jsonParseErrorCatch);

        if (tExtras) {
          res.resourceList.forEach((item: IResItem) => {
            const { resourceName, resourceCode, extras } = item;
            const itemExtras = jsonParse(extras, `${tResourceName} / ${resourceName}`, this.jsonParseErrorCatch);

            if (itemExtras && itemExtras?.loadUrl) {
              tResult.push({
                topKey: res.resourceCode,
                topName: tResourceName,
                topPath: tExtras.routePath,
                key: resourceCode,
                name: resourceName,
                path: formatPath(itemExtras.routePath),
                loadUrl: itemExtras.loadUrl,
                url: getUrl(itemExtras.url),
              });
            } else {
              console.log('应用静态数据配置缺失，将无法启用AppRouter。');
            }
          });
        }
      }
    });

    // console.log('appRoutes:', tResult);
    return tResult;
  }

  // 可添加到标签页的菜单路径信息列表，[{name: xxx, path:yyy, url: zzz, ...}] path:本地路由path， url：iframe跳转地址
  @computed get menuPaths() {
    const tResult: IMenuItem[] = [];

    this.resList.forEach((res: IResItem) => {
      if (res?.resourceList) {
        const { extras: resExtras, resourceName: tResourceName } = res;
        const tExtras = jsonParse(resExtras, tResourceName, this.jsonParseErrorCatch);

        if (tExtras) {
          res.resourceList.forEach((item: IResItem) => {
            const { resourceList, resourceName: itemResourceName, extras: itemExtras } = item;
            const parentExtras = jsonParse(itemExtras, itemResourceName, this.jsonParseErrorCatch);

            if (parentExtras && resourceList?.length) {
              resourceList.forEach((it: IResItem) => {
                const { resourceName, resourceCode, extras } = it;
                const itExtras = jsonParse(
                  extras,
                  `${tResourceName} / ${itemResourceName} / ${resourceName}`,
                  this.jsonParseErrorCatch,
                );

                if (itExtras) {
                  tResult.push({
                    topKey: res.resourceCode,
                    topName: tResourceName,
                    topPath: tExtras.routePath,
                    parentKey: item.resourceCode,
                    parentPath: formatPath(parentExtras.routePath),
                    key: resourceCode,
                    name: resourceName,
                    path: formatPath(itExtras.routePath),
                    url: getUrl(itExtras.url),
                  });
                }
              });
            }
          });
        }
      }
    });

    // console.log('menuPaths:', tResult);
    return tResult;
  }

  @action
  setResList(value: any = []) {
    if (value && value.length) {
      this.resList = [].concat(value.slice());
    }
    // console.log('resList:', this.resList);
  }

  @action
  setHeaderMenuCurrent = (value = '') => {
    this.headerMenuCurrent = value;
    console.log('headerMenuCurrent:', this.headerMenuCurrent);
  };
  @action
  setAsideMenuCurrent = (value = '') => {
    this.asideMenuCurrent = value;
    console.log('asideMenuCurrent:', this.asideMenuCurrent);
  };

  // 采用jsonParse处理数据的错误处理回调
  jsonParseErrorCatch = (e, resPath) => {
    // if (this.toastMsg[0]) {
    //     return;
    // }
    // this.toastMsg.push(e.message);
    // resPath && this.rootStore.showToast(`请检查菜单 [ ${e.message || resPath} ] 是否配置正确。`);
    console.log(e);
  };

  /**
   * 获取资源列表
   * @param {object} params 参数
   * @returns {promise}
   */
  getAdminResList = (params = {}, options = {}) => {
    const { sendPost } = this.rootStore;
    const { showToast } = this.rootStore.UIStore;

    return sendPost(apiUrls.GET_ADMIN_RES_LIST, params, options).then(({ result, data }): any => {
      if (result === '0' && Array.isArray(data)) {
        const tResourceList: IResItem[] = data.filter((item: IResItem) => {
          const tExtras = jsonParse(item.extras);

          if (tExtras && tExtras[this.filterKey]) {
            item.extras = tExtras;
            return true;
          }
          return false;
        });

        this.setResList(tResourceList);

        return true;
      } else {
        showToast(responseCode.codeMsg('2'));
        return false;
      }
    });
  };

  // 通过 pathname 获取 pathname 对应到路由描述信息对象
  getTitleByPathname = (pathname) => {
    // 模拟全局路由配置对象
    const routerConfig = this.pathValidate(pathname);
    if (typeof routerConfig === 'object' && Object.keys(routerConfig).length) {
      return routerConfig;
    }

    return null;
  };

  // 可添加到标签页的菜单路径有效性检测，在menuPaths中视为有效
  pathValidate = (path) => {
    if (path) {
      return this.menuPaths.find((item) => {
        return item.path === path;
      });
    }

    return {};
  };

  // 获取默认菜单项: location
  getDefaultMenuItemPath = ({ pathname, search }) => {
    if (!this.menuPaths.length) {
      return undefined;
    }

    // 根据当前一级菜单项判断默认tab的path
    let tIndex = this.menuPaths.findIndex((item) => {
      return item.topPath === pathname || item.path === pathname;
    });

    if (tIndex === -1) {
      tIndex = 0;
    }

    const tMenuPathItem = this.menuPaths[tIndex];
    let tMenuPath = tMenuPathItem.path;

    if (search.indexOf('type=top') === -1) {
      tMenuPath = pathname;
    }

    this.setAsideMenuCurrent(tMenuPath);

    return tMenuPath;
  };

  // 获取侧边栏默认展开keys
  getDefaultOpenKeys = (pathname) => {
    const result = this.menuPaths.find((item) => {
      return pathname === item.path;
    });
    if (result) {
      return result.parentKey;
    }

    return '';
  };
}

export default MenuStore;

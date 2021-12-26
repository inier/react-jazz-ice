/* eslint-disable max-lines */
import { Message } from '@alifd/next';
import { history, matchPath, getInitialData } from 'ice';
import { useAliveController } from 'react-activation';

import {
  createNewTab,
  deepFlattenRoutes,
  generateRoutePath,
  getTabId,
  isEqualLocation,
  isObject,
  isValidTabParam,
  parsePath,
} from './utils';

let flattenedRoutes = [];

/** 获取路由配置 */
const getRouteConfig = (location) => {
  const { routes = [] } = getInitialData();
  if (!flattenedRoutes.length) {
    flattenedRoutes = deepFlattenRoutes(routes, '/');
  }
  const matchList = [];
  for (let i = 0; i < flattenedRoutes.length; i += 1) {
    const routeConfig = flattenedRoutes[i];
    const match = matchPath(location.pathname, {
      path: routeConfig.path,
      exact: routeConfig.exact,
      strict: routeConfig.strict,
    });
    if (match) {
      matchList.push(flattenedRoutes[i]);
    }
  }
  return matchList.length ? matchList[matchList.length - 1] : undefined;
};

/**
 * 选项卡API
 * @param routeTabsState
 * @param routeTabsDispatch
 */
export const useRouteTabsApi = (routeTabsState, routeTabsDispatch) => {
  const { dropScope, /* getCachingNodes, */ refreshScope } = useAliveController();
  // console.log('================>getCachingNodes()', getCachingNodes());
  // console.log('================>tabs()', routeTabsState);

  /** 获取实例的 index 值 */
  const _getTabIndexById = (id) => {
    return routeTabsState.tabs.findIndex((item) => item.id === id);
  };

  /** 判断是否存在实例 */
  const _isExistTabInstance = (obj) => {
    return obj?.$isTab && obj?.id ? !!routeTabsState.tabs.find((item) => item.id === obj.id) : false;
  };

  /** 处理关闭的提示 */
  const _handleCloseTips = (tabInstance, callback) => {
    if (tabInstance) {
      if (typeof tabInstance.closeTips === 'string') {
        // eslint-disable-next-line no-alert
        if (window.confirm(tabInstance.closeTips)) {
          callback();
          return;
        }
      } else if (typeof tabInstance.closeTips === 'boolean') {
        // eslint-disable-next-line no-alert
        if (window.confirm('确定要关闭这个页面吗?')) {
          callback();
          return;
        }
      } else if (tabInstance.closeTips instanceof Function) {
        tabInstance.closeTips(callback);
        return;
      }
    }
    callback();
  };

  /** 销毁实例及事件 */
  const _destroyTab = (id) => {
    if (!id) {
      return;
    }
    // eslint-disable-next-line no-nested-ternary
    const target = id instanceof Array ? id : id ? [id] : [];
    // 同步状态
    routeTabsDispatch({
      type: 'TAB_DELETE',
      payload: target, // id is array
    });
    target.forEach((item) => {
      routeTabsDispatch({
        type: 'EVENT_DELETE',
        payload: {
          id: item,
        },
      });
      routeTabsDispatch({
        type: 'EVENT_TRIGGER_LIST_DELETE',
        payload: {
          id: item,
        },
      });
    });
    // 删除实例
    dropScope(new RegExp(target.join('|')));
  };

  /**
   * 获取选项卡实例
   * @param target 可以是 id | history.push 的对应参数 | 选项卡实例 | 路径字符串 | 为空表示当前选项卡
   * @returns {{$isTab}|{search: string, query: {}, pathname: string}|null|*|T}
   */
  const getTabInstance = (target) => {
    let targetObj = target;
    if (!target) {
      console.log('getTabInstance: ', routeTabsState.currentTab);
      return routeTabsState.currentTab;
    }
    if (typeof target === 'string') {
      if (target.indexOf('/') === 0) {
        // 传进来的是 url
        // 解析 URL
        targetObj = parsePath(target);
      } else {
        // 传进来的是 id
        return routeTabsState.tabs.find((item) => item.id === target);
      }
    }
    if (isObject(targetObj)) {
      if (targetObj.$isTab) {
        // 如果传进来的本来就是实例对象, 判断是否真实存在, 存在就返回
        return _isExistTabInstance(targetObj) ? targetObj : null;
      }
      let i;
      let tab;
      // 先 全匹配 的查找
      // 倒叙遍历
      for (i = routeTabsState.tabs.length - 1; i >= 0; i -= 1) {
        tab = routeTabsState.tabs[i];
        // 先判断 location.pathname 部分
        if (isEqualLocation(tab.location, targetObj)) {
          break;
        }
      }
      // 再按规则模糊匹配查找
      if (i === -1) {
        // 倒叙遍历
        for (i = routeTabsState.tabs.length - 1; i >= 0; i -= 1) {
          tab = routeTabsState.tabs[i];
          // 先判断 location.pathname 部分
          if (tab.location.pathname === targetObj.pathname) {
            // 相同再比对 query 参数
            // 如果 tab 没有 query 参数, 直接匹配
            if (Object.keys(tab?.location.query || {}).length === 0) {
              break;
            }
            // 如果 targetObj 参数更多, 那就是新页面
            if (Object.keys(targetObj?.query || {}).length !== 0) {
              // 否则判断 targetObj 的参数是否再 tab 里面都存在
              if (Object.keys(tab?.location.query).length >= Object.keys(targetObj?.query || {}).length) {
                if (
                  Object.keys(targetObj.query).every(
                    // eslint-disable-next-line
                    (key) => targetObj.query[key] === tab.location.query[key],
                  )
                ) {
                  break;
                }
              }
            }
          }
        }
      }
      if (i > -1) {
        return routeTabsState.tabs[i];
      }
    }
    return null;
  };

  const getTabs = () => {
    return routeTabsState.tabs;
  };

  /** 获取当前选项卡 */
  const getCurrentTab = () => {
    return routeTabsState.currentTab;
  };

  /**
   * 更新选项卡实例
   * @param target 要更新的选项卡
   * @param payload 要更新的属性内容
   * @param safeUpdate 是否安全更新, 默认是 true. 防止更新了一些必要的属性
   */
  const updateTabInstance = (target, payload, safeUpdate = true) => {
    const instance = target ? getTabInstance(target) : routeTabsState.currentTab;
    if (instance) {
      // 更改信息
      let result;
      // 替换允许的字段
      if (safeUpdate) {
        result = { ...instance };
        ['name', 'fixed', 'icon', 'routePath', 'location', 'closeTips'].forEach((key) => {
          if (payload[key]) {
            result[key] = payload[key];
          }
        });
      } else {
        result = { ...instance, ...payload };
      }
      routeTabsDispatch({ type: 'TAB_UPDATE', payload: result });
    }
  };

  /**
   * 刷新页面
   * @param target 要刷新的页面
   */
  const refreshTab = (target) => {
    const instance = target ? getTabInstance(target) : routeTabsState.currentTab;
    if (instance) {
      refreshScope(instance.keepaliveId);
    }
    // TODO 非缓存页面的刷新有问题
  };

  /**
   * 打开选项卡
   * @param target 要打开的选项卡
   * @param options
   * @param options.force 是否强制打开标签页, 会被参数的 target.state.force 参数覆盖
   * @param options.refresh 如果页面已存在是否要刷新
   */
  const openTab = (target, options) => {
    const { force = false, refresh = false } = options || {};
    const isForce = !target?.$isTab ? target?.state?.force || force || false : false;
    let targetPath;
    if (isForce !== true) {
      // 判断是否强制打开页面
      const tabInstance = getTabInstance(target);
      // 切换选项卡: 选项卡存在, 且不是当前选项卡
      if (tabInstance) {
        if (routeTabsState.currentTab.id !== tabInstance.id) {
          targetPath = tabInstance.routePath;
          // 同路径选项卡切换的场景
          // 同路径页面是无法跳转的, 要强制设置当前选项卡
          if (routeTabsState.currentTab.routePath === tabInstance.routePath) {
            routeTabsDispatch({
              type: 'CURRENT_UPDATE',
              payload: tabInstance,
            });
            // 更新历史记录
            routeTabsDispatch({
              type: 'HISTORY_ADD',
              payload: tabInstance,
            });
            if (refresh) {
              refreshTab(tabInstance);
            }
          } else {
            // 关闭选项卡, 定位下个标签的场景

            // state 参数有可能有更新, 比如我更新了标题
            // const nextTabInstance = { ...tabInstance, ...(target?.state || {}) };
            // routeTabsDispatch({
            //     type: 'TAB_UPDATE',
            //     payload: nextTabInstance
            // });
            // 指定下个要高亮的选项卡
            window.ROUTE_TABS_NEXT_HIGHLIGHT_TAB = { ...tabInstance, ...(target?.state || {}) };
            window.ROUTE_TABS_CHANGE_COMPLETE = false;
            window.ROUTE_TABS_NEED_REFRESH_TAB = refresh;
            setTimeout(() => {
              history.push(targetPath);
            });
          }
        }
        return;
      }
    }

    setTimeout(() => {
      if (typeof target === 'string') {
        history.push(target);
        return;
      }

      // 新开页面的情况
      const pushParam = target?.$isTab ? target.location : target;
      history.push({
        pathname: pushParam.pathname,
        query: pushParam.query,
        state: pushParam.state,
      });
    });
  };

  /**
   * 添加选项卡, 但是不跳转
   * @param pathnameArr 路径数组
   */
  const addTab = (pathnameArr) => {
    pathnameArr?.forEach((pathname) => {
      const customLocation = {
        pathname,
        query: {},
        state: {},
      };
      const routeConfig = getRouteConfig(customLocation);
      if (routeConfig) {
        const tabInstance = createNewTab(customLocation, routeConfig);
        routeTabsDispatch({
          type: 'TAB_ADD',
          payload: tabInstance,
        });
      }
    });
  };

  /**
   * 替换选项卡内容
   * 相比 history.replace, 增加关闭提示和后退的能力
   * @param target 要替换的路径
   * @param force 是否强制替换
   */
  const replaceTab = (target, force) => {
    const fromTabInstance = getTabInstance(); // 获取当前实例
    const isForce = fromTabInstance.location?.state || force || false;
    let historyPushParam = target;

    // TODO: 替换路由后退的标题不对
    if (!fromTabInstance || !target || target.$isTab) {
      return;
    }

    if (typeof target === 'string') {
      historyPushParam = parsePath(target);
    }

    const callback = () => {
      historyPushParam.state = {
        ...(historyPushParam.state || {}),
        routeType: 'replace',
      };
      history.push(historyPushParam);
    };

    if (isForce === false) {
      _handleCloseTips(fromTabInstance, callback);
    } else {
      callback();
    }
  };

  /**
   * 替换选项卡标题
   * @param title 要替换的标题名称
   * @param target 要替换的选项卡, 为空表示当前选项卡
   */
  const replaceTabTitle = (title, target) => {
    updateTabInstance(target, {
      name: title,
    });
  };

  /** 判断是否允许后退 */
  const enableBackPrevTab = () => {
    return !!routeTabsState.currentTab.prevTab;
  };

  /**
   * 选项卡级别的后退
   * @param target 当前选项卡
   * @param force 是否强制后退, 忽略关闭提示等信息
   */
  const backPrevTab = (target, force = false) => {
    const currentTabInstance = target || getTabInstance();
    const prevTabInstance = currentTabInstance?.prevTab;

    if (!currentTabInstance || !prevTabInstance) {
      return;
    }

    const callback = () => {
      window.ROUTE_TABS_NEXT_HIGHLIGHT_TAB = prevTabInstance;
      history.push(prevTabInstance.routePath);
    };

    if (force === false) {
      _handleCloseTips(currentTabInstance, callback);
    } else {
      callback();
    }
  };

  /**
   * 关闭选项卡
   * @param target 要关闭的选项卡, 空值表示当前选项卡
   * @param options
   * @param options.force 是否强制关闭, 忽略关闭提示等信息
   * @param options.nextTab 下个要切换的选项卡
   * @param options.refresh 如果目标已存在, 是否需要刷新
   */
  const closeTab = (target, options) => {
    const { force = false, nextTab = null, refresh = false } = options || {};
    let willClosedTabInstance;
    let nextTabInstance;

    // 获取要关闭标签页的实例
    if (!target) {
      willClosedTabInstance = routeTabsState.currentTab;
    } else {
      willClosedTabInstance = getTabInstance(target);
    }
    // 没有找到要关闭的选项卡, 直接退出
    if (!willClosedTabInstance) {
      return;
    }

    // 没有找到要关闭的选项卡, 直接退出
    if (routeTabsState.tabs.length === 1) {
      Message.warning('最后一个标签页不能关闭');
      return;
    }

    const callback = () => {
      // 判断存不存在 nextTab 的实例
      if (nextTab) {
        nextTabInstance = nextTab ? getTabInstance(nextTab) : null;
      } else {
        const currentIndex = _getTabIndexById(routeTabsState.currentTab.id);
        const targetIndex = _getTabIndexById(willClosedTabInstance.id);
        // 判断关闭的是否是当前高亮的标签
        if (currentIndex === targetIndex) {
          // 如果没有 nextTab 参数, 或者对应的实例, 就按规则查找右侧或者末尾的
          nextTabInstance = routeTabsState.tabs[+targetIndex + 1] || routeTabsState.tabs[targetIndex - 1];
        } else {
          // 关闭的是其他标签页, 就不需要做切换
          nextTabInstance = routeTabsState.currentTab;
        }
      }

      // 同步状态, 删除实例
      _destroyTab(willClosedTabInstance.id);
      // 处理下一个高亮页
      if (nextTabInstance?.routePath) {
        openTab(nextTabInstance, { refresh });
      } else if (isValidTabParam(nextTab)) {
        openTab(nextTab, { refresh });
      }
    };

    if (willClosedTabInstance && willClosedTabInstance.closeTips && !force) {
      _handleCloseTips(willClosedTabInstance, callback);
    } else {
      callback();
    }
  };

  /**
   * 关闭多个标签页
   * @param tabs 要关闭的标签页实例
   * @param force 是否强制关闭, 忽略关闭提示等信息
   */
  const closeTabs = (tabs, force = false) => {
    const needCloseTabs = tabs.filter((tab) => tab.fixed !== true);
    const needShowCloseTip = needCloseTabs.some((tab) => !!tab.closeTips);
    const isContainerCurrentTab = tabs.some((tab) => tab.id === routeTabsState.currentTab.id);

    // eslint-disable-next-line no-alert
    if (force || !needShowCloseTip || window.confirm('是否强制关闭其他标签页?')) {
      _destroyTab(needCloseTabs.map((tab) => tab.id));
    }

    // 如果要删除的标签页包含了当前页面, 那就要处理下一个高亮页
    if (isContainerCurrentTab) {
      // 如果有固定页就跳转到最后一个固定页, 没有就跳首页
      const nextTabInstance = routeTabsState.tabs.reverse().filter((tab) => tab.fixed)?.[0];
      if (nextTabInstance) {
        openTab(nextTabInstance);
      } else {
        openTab('/');
      }
    }
  };

  /** 关闭其他标签页 */
  const closeOtherTab = (force = false) => {
    const needCloseTabs = routeTabsState.tabs.filter((tab) => tab.id !== routeTabsState.currentTab.id);
    closeTabs(needCloseTabs, force);
  };

  /** 关闭左侧标签页 */
  const closeLeftTab = (force = false) => {
    const currentTabIndex = _getTabIndexById(routeTabsState.currentTab.id);
    const needCloseTabs = routeTabsState.tabs.slice(0, currentTabIndex);
    closeTabs(needCloseTabs, force);
  };

  /** 关闭右侧标签页 */
  const closeRightTab = (force = false) => {
    const currentTabIndex = _getTabIndexById(routeTabsState.currentTab.id);
    const needCloseTabs = routeTabsState.tabs.slice(+currentTabIndex + 1, routeTabsState.tabs.length);
    closeTabs(needCloseTabs, force);
  };

  /** 关闭右侧标签页 */
  const closeAllTab = (force = false) => {
    closeTabs(routeTabsState.tabs, force);
  };

  /**
   * 注册事件
   * @param target 选项卡实例
   * @param eventName 事件名称
   * @param fn 要执行的事件
   */
  const registerEvent = (target, eventName, fn) => {
    const tabInstance = getTabInstance(target);
    if (!tabInstance || typeof eventName !== 'string' || !(fn instanceof Function)) {
      return;
    }
    routeTabsDispatch({
      type: 'EVENTS_ADD',
      payload: {
        id: tabInstance.id,
        eventName,
        fn,
      },
    });
  };

  /**
   * 注销事件
   * @param target 选项卡实例
   * @param eventName 事件名称
   * @param fn 要执行的事件
   */
  const unregisterEvent = (target, eventName, fn) => {
    const tabInstance = getTabInstance(target);
    if (tabInstance || !eventName || typeof eventName !== 'string' || !fn || !(fn instanceof Function)) {
      return;
    }
    routeTabsDispatch({
      type: 'EVENT_DELETE',
      payload: {
        id: tabInstance.id,
        eventName,
        fn,
      },
    });
  };

  /**
   * 添加触发的事件到事件池
   * 因为目标选项卡此时还没有被激活, 是无法操作的. 需要等到页面被激活后, 才能被执行
   * @param target 目标选项卡
   * @param eventName 事件名称
   * @param params 参数
   */
  const triggerEvent = (target, eventName, ...params) => {
    const tabInstance = getTabInstance(target);
    if (!tabInstance || typeof eventName !== 'string') {
      return;
    }
    routeTabsDispatch({
      type: 'EVENT_TRIGGER_LIST_ADD',
      payload: {
        id: tabInstance.id,
        eventName,
        params,
      },
    });
  };

  /**
   * 执行事件
   * @param target 目标选项卡
   * @returns {Promise<void>}
   */
  const execEvent = async (target) => {
    const tabInstance = getTabInstance(target);
    let eventNameQueue = tabInstance ? routeTabsState.eventTriggerList[tabInstance.id] || [] : [];
    eventNameQueue = Array.from(eventNameQueue);

    if (routeTabsState.events[tabInstance.id] && eventNameQueue.length) {
      for (let i = 0, eventName, params; i < eventNameQueue.length; i += 1) {
        eventName = eventNameQueue[i].eventName;
        params = eventNameQueue[i].params;
        if (routeTabsState.events[tabInstance.id][eventName]?.length) {
          for (let m = 0, fn; m < routeTabsState.events[tabInstance.id][eventName].length; m += 1) {
            fn = routeTabsState.events[tabInstance.id][eventName][m];
            // eslint-disable-next-line no-await-in-loop
            await fn?.apply(tabInstance, params instanceof Array ? params : [params]);
          }
        }
      }
      // 清空当前页面的事件池
      routeTabsDispatch({
        type: 'EVENT_TRIGGER_LIST_DELETE',
        payload: {
          id: tabInstance.id,
        },
      });
    }
  };

  /** 监听路由变化前的动作 */
  const beforeRouterChange = (location, action) => {
    // 通过往全局控制 ROUTE_TABS_CHANGE_COMPLETE 属性来防止选项卡不必要的更新
    if (action !== 'POP') {
      window.ROUTE_TABS_CHANGE_COMPLETE = false;
    }
  };

  /** 监听路由变化 */
  const listenRouterChange = (location, action) => {
    let tabInstance;
    const execRefreshTab = () => {
      if (window.ROUTE_TABS_NEED_REFRESH_TAB) {
        setTimeout(() => {
          refreshTab(tabInstance);
        });
      }
    };

    // 判断是否是 replace 操作
    if (
      (action === 'REPLACE' || (action !== 'POP' && location.state?.routeType === 'replace')) &&
      !!routeTabsState.currentTab
    ) {
      // 如果没有找到就去获取路由配置
      const routeConfig = getRouteConfig(location);
      // 如果连路由实例也找不到, 要弹出提示框
      if (!routeConfig) {
        Message.error('没有这个路由!');
      } else {
        tabInstance = {
          ...createNewTab(location, routeConfig),
          prevTab: routeTabsState.currentTab,
          keepaliveId: `${routeTabsState.currentTab.id}-${getTabId()}`,
          id: routeTabsState.currentTab.id,
        };
        routeTabsDispatch({
          type: 'TAB_UPDATE',
          payload: tabInstance,
        });
        routeTabsDispatch({
          type: 'CURRENT_UPDATE',
          payload: tabInstance,
        });
        // 判断是否要销毁实例
        if (action === 'REPLACE') {
          dropScope(routeTabsState.currentTab.keepaliveId);
        }
      }
    } else if (_isExistTabInstance(window.ROUTE_TABS_NEXT_HIGHLIGHT_TAB)) {
      // 如果有 ROUTE_TABS_NEXT_HIGHLIGHT_TAB 值, 就跳过匹配环境, 直接拿这个值当作当前实例
      tabInstance = window.ROUTE_TABS_NEXT_HIGHLIGHT_TAB;
      routeTabsDispatch({
        type: 'CURRENT_UPDATE',
        payload: tabInstance,
      });
      execRefreshTab();
    } else {
      // TODO 跳转新链接的时候, 之前后退导致的缓存内容需要销毁
      const routePath = generateRoutePath(location);
      // 拿 location 去已打开的选项卡中查找实例
      if (action !== 'POP') {
        tabInstance = getTabInstance(location);
      } else {
        // TODO 缺少索引, 当连续后退的时候会有问题
        // 如果选项卡的 routePath 有被修改过, 后退操作的时候, 应该从历史记录里面找选项卡实例
        const historyTabInstance = routeTabsState.historyList.reverse().find((item) => item.routePath === routePath);
        // 有历史记录
        if (historyTabInstance) {
          // 但没有选项卡 (表示这个选项卡被关闭了)
          const targetTab = routeTabsState.tabs.find((item) => item.id === historyTabInstance.id);
          if (!targetTab) {
            routeTabsDispatch({
              type: 'TAB_ADD',
              payload: historyTabInstance,
            });
            // 高亮选项卡
            routeTabsDispatch({
              type: 'CURRENT_UPDATE',
              payload: historyTabInstance,
            });
            return;
          }
          tabInstance = historyTabInstance;
        } else {
          tabInstance = getTabInstance(location);
        }
      }

      if (!tabInstance || (action !== 'POP' && location.state?.force === true)) {
        // 如果没有找到就去获取路由配置
        const routeConfig = getRouteConfig(location);
        // 如果连路由实例也找不到, 要弹出提示框
        if (!routeConfig) {
          Message.error('没有这个路由!');
        } else {
          // 打开新的选项卡, 并设置高亮
          // 添加新记录
          tabInstance = createNewTab(location, routeConfig);
          routeTabsDispatch({
            type: 'TAB_ADD',
            payload: tabInstance,
          });
          // 高亮选项卡
          routeTabsDispatch({
            type: 'CURRENT_UPDATE',
            payload: tabInstance,
          });
        }
      } else {
        // 匹配到选项卡实例, 就高亮它
        routeTabsDispatch({
          type: 'CURRENT_UPDATE',
          payload: tabInstance,
        });
        routeTabsDispatch({
          type: 'TAB_UPDATE',
          payload: tabInstance,
        });
        execRefreshTab();
      }
    }

    // ROUTE_TABS_CHANGE_COMPLETE 是解决 因为状态更新, 导致页面在切换前会被渲染一次, 这个是没有必要的.
    // 那为何不在切换后在做数据更新? 因为实现思路问题, 有些需求(例如切换选项卡, 需要提前锁定下个标签页), 需要在切换前更新数据
    window.ROUTE_TABS_CHANGE_COMPLETE = true;
    window.ROUTE_TABS_NEXT_HIGHLIGHT_TAB = null;
    window.ROUTE_TABS_NEED_REFRESH_TAB = false;
    // 更新历史记录
    routeTabsDispatch({
      type: 'HISTORY_ADD',
      payload: tabInstance,
    });
  };

  return {
    getTabInstance,
    getTabs,
    getCurrentTab,
    updateTabInstance,
    addTab,
    openTab,
    replaceTab,
    replaceTabTitle,
    enableBackPrevTab,
    backPrevTab,
    refreshTab,
    registerEvent,
    unregisterEvent,
    triggerEvent,
    execEvent,
    closeTab,
    closeOtherTab,
    closeAllTab,
    closeLeftTab,
    closeRightTab,
    beforeRouterChange,
    listenRouterChange,
  };
};

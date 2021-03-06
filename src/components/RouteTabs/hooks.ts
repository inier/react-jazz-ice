import { useContext, useEffect, useReducer, useRef } from 'react';

import { isEqual } from 'lodash-es';
import { useActivate } from 'react-activation';

import RouteTabsContext from './context';

export const useRouteTabsContext = () => useContext(RouteTabsContext);

/**
 * 通过 KeepAlive 组件提供的 useActivate hook 来监听页面被激活
 * 激活的时候去消费事件
 */
export const useRouteEventListen = () => {
  const { action } = useRouteTabsContext();
  useActivate(() => {
    action.execEvent();
  });
};

export const useDeepCompareEffect = (effect, deps) => {
  const ref = useRef(undefined);
  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, ref.current);
};

/**
 * 监听依赖，当依赖变化时触发重渲染防抖，返回值用于判断是否显示重渲染的节点
 * @param dependency 依赖（如果是引用数据类型，需要注意数据不变时保持引用不变）
 * @param wait 等待时间（毫秒，默认值 500）
 * @returns 是否渲染
 */
export function useDebounceReRender(dependency, wait = 500) {
  const [, forcedToRender] = useReducer((x) => +x + 1, 0);
  const dependencyRef = useRef(dependency);

  let triggered = false;
  if (dependency !== dependencyRef.current) {
    triggered = true;
  }
  dependencyRef.current = dependency;

  const visibleRef = useRef(true);
  if (triggered) {
    visibleRef.current = false;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleRef.current === false) {
        visibleRef.current = true;
        forcedToRender();
      }
    }, wait);
    return () => {
      clearTimeout(timer);
    };
  });

  return visibleRef.current;
}

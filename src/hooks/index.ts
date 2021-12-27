// https://ahooks.js.org/
// useRequest, useFusionTable, useInterval...
export * from 'ahooks';
// useRequest
export { useRequest } from 'ice';

// == 存放自定义的React Hooks
// export { default as useRequest } from './useRequest';
export { default as useRefProps } from './useRefProps';
export { default as useRefState } from './useRefState';
export { default as useStorageState } from './useStorageState';
export { default as useOnceByCondition } from './useOnceByCondition';

// keepLive
export { useActivate } from 'react-activation';
// RouteTabs
export { useRouteTabsContext, useRouteEventListen } from '@/components/RouteTabs';
// mobx store hook
export { default as useMobxStore, inject } from './useMobxStore';

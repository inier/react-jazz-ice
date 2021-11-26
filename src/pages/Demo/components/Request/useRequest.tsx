import React, { useCallback } from 'react';
import { useRequest } from 'ice';
import userService from '@/api/services/demo';

export default function DemoUseRequest({ p }) {
  const key = `getResList-${p}`;
  // 调用 service
  const { data, request } = useRequest(userService.getResList, {
    cacheKey: key,
    throttleInterval: 5000,
    refreshOnWindowFocus: true,
  });

  const handleClick = useCallback(() => {
    // 触发数据请求
    request();
  }, [p]);

  return (
    <p>
      <button onClick={handleClick}>useRequest加载</button>useRequest:
      <span>
        {data?.data[0]?.resourceName}-{p}
      </span>
    </p>
  );
}

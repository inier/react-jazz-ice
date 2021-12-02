import React, { useCallback } from 'react';
import { useRequest } from 'ice';
import userService from '@/api/services/demo';

export default function DemoUseRequest({ id, options = {} }) {
  // 调用 service
  const { data, request } = useRequest(userService.getResList, {
    ...options,
  });

  const handleClick = useCallback(() => {
    // 触发数据请求
    request();
  }, [id]);

  return (
    <div>
      <button onClick={handleClick}>useRequest加载</button>
      <span> options：{JSON.stringify(options)}</span>
      <span>
        {id}-result: {data?.data[0]?.resourceName}
      </span>
    </div>
  );
}

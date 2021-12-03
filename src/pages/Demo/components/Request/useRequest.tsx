import React, { useCallback } from 'react';
import { useRequest } from 'ice';
import userService from '@/api/services/demo';

export function DemoUseRequest1({ id, options = {} }) {
  // 用法1：传入字符串
  const { data, request } = useRequest('/api/user');
  const handleClick1 = useCallback(() => {
    // 触发数据请求
    request();
  }, [id]);

  return (
    <div>
      <h6>用法：传入字符串</h6>
      <div>
        <button onClick={handleClick1}>useRequest</button>
        <span>
          {id}-result: {data?.data?.name}
        </span>
      </div>
    </div>
  );
}

export function DemoUseRequest2({ id, options = {} }) {
  // 用法2：传入配置对象
  const { data, request } = useRequest({
    url: '/api/user',
    method: 'get',
  });
  const handleClick = useCallback(() => {
    // 触发数据请求
    request();
  }, [id]);

  return (
    <div>
      <h6>用法：传入配置对象</h6>
      <div>
        <button onClick={handleClick}>useRequest</button>
        <span>
          {id}-result: {data?.data?.name}
        </span>
      </div>
    </div>
  );
}

export function DemoUseRequest3({ id, options = {} }) {
  // 用法3：传入 service 函数
  const { data, request } = useRequest(userService.getResList, {
    ...options,
  });
  const handleClick = useCallback(() => {
    // 触发数据请求
    request();
  }, [id]);

  return (
    <div>
      <h6>用法：传入 service 函数</h6>
      <div>
        <button onClick={handleClick}>useRequest</button>
        <span> options：{JSON.stringify(options)}</span>
        <span>
          {id}-result: {data?.data[0]?.resourceName}
        </span>
      </div>
    </div>
  );
}

import React, { useCallback } from 'react';
import { useRequest } from 'ice';
import userService from '@/api/services/demo';

export default function DemoUseRequest({ id, options = {} }) {
  // 用法1：传入字符串
  const { data: data1, request: request1 } = useRequest('/api/user');
  const handleClick1 = useCallback(() => {
    // 触发数据请求
    request1();
  }, [id]);

  // 用法2：传入配置对象
  const { data: data2, request: request2 } = useRequest({
    url: '/api/user',
    method: 'get',
  });
  const handleClick2 = useCallback(() => {
    // 触发数据请求
    request2();
  }, [id]);

  // 用法3：传入 service 函数
  const { data: data3, request: request3 } = useRequest(userService.getResList, {
    ...options,
  });
  const handleClick3 = useCallback(() => {
    // 触发数据请求
    request3();
  }, [id]);

  return (
    <div>
      <h6>用法1：传入字符串</h6>
      <div>
        <button onClick={handleClick1}>useRequest加载</button>
        <span>
          {id}-result: {data1?.data?.name}
        </span>
      </div>
      <h6>用法2：传入配置对象</h6>
      <div>
        <button onClick={handleClick2}>useRequest加载</button>
        <span>
          {id}-result: {data2?.data?.name}
        </span>
      </div>
      <h6>用法3：传入 service 函数</h6>
      <div>
        <button onClick={handleClick3}>useRequest加载</button>
        <span> options：{JSON.stringify(options)}</span>
        <span>
          {id}-result: {data3?.data[0]?.resourceName}
        </span>
      </div>
    </div>
  );
}

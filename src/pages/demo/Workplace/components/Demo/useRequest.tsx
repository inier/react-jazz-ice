import React, { useEffect } from 'react';
import { useRequest } from 'ice';
import userService from '@/api/services/demo';

export default function DemoUseRequest({p}) {
    const key = `getResList-${p}`;
  // 调用 service
  const { data, error, loading, request } = useRequest(userService.getResList, {
    cacheKey: key,
    // throttleInterval : 5000,
    refreshOnWindowFocus:true,
  });

  useEffect(() => {
    // 触发数据请求
    request();
  }, []);
  
  const handleClick = ()=>{
     // 触发数据请求
     request();
  }

  if (!data && loading) {
    return <p>loading</p>;
  }
  console.log(data);

  return <><button onClick={handleClick}>useRequest加载</button>useRequest:<span>{key}</span></>;
}
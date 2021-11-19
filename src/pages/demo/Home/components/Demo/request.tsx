import React from 'react';
import { inject, observer } from 'mobx-react';

function DemoRequest(props) {
  const { menuStore } = props;
  const data = { x: 101, };
  const handleClick = () => {
    // 正常请求
    menuStore.getAdminResList(data);    
  }
  const handleClickCancel = () => {
    // 测试取消请求
    menuStore.getAdminResList(data, { cancelRequest: true });    
  }
  const handleClickRetry = () => { 
    // 测试请求重发，除了原请求外还会重发3次
    menuStore.getAdminResList(data, { retry: 3, retryDelay: 1000 });    
  }
  const handleClickCache = () => {
    // 测试缓存请求带参数：setExpireTime 为缓存有效时间ms
    menuStore.getAdminResList(data, { method: 'get', cache: true, setExpireTime: 30000 });
  }
  const handleClickCacheDefault = () => {    
    // 测试缓存请求参数值不一样
    menuStore.getAdminResList(data, { cache: true })
  }

  return (
    <div>
      <button onClick={handleClick}>request正常请求</button>
      <button onClick={handleClickCancel}>request取消请求</button>
      <button onClick={handleClickRetry}>request请求重发</button>
      <button onClick={handleClickCache}>request缓存请求带参数</button>
      <button onClick={handleClickCacheDefault}>request缓存请求默认</button>

      DemoRequest: <span>{menuStore.resList[0]?.resourceName}</span>
    </div>
  );
}

export default inject("menuStore")(observer(DemoRequest));

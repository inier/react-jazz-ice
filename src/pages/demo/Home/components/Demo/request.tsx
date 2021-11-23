import React from 'react';
import { inject, observer } from 'mobx-react';

function DemoRequest(props) {
  const { menuStore } = props;
  const data = { x: 101 };
  const handleClick = () => {
    // 正常请求
    menuStore.getAdminResList(data, { loading: true });
  };
  const handleClickCancel = () => {
    // 测试取消请求
    menuStore.getAdminResList(data, { cancelRequest: true });
  };
  const handleClickRetry = () => {
    // 测试请求重发，除了原请求外还会重发3次
    menuStore.getAdminResList(data, { retry: 3, retryDelay: 1000 });
  };
  const handleClickRetry2 = () => {
    // 测试请求重发，除了原请求外还会重发3次
    menuStore.getAdminResList(data, { retryTimes: 3 });
  };
  const handleClickThrottle = () => {
    // 测试请求节流
    menuStore.getAdminResList(data, { threshold: 5 * 1000 });
  };
  const handleClickCache = () => {
    // 测试缓存请求带参数：setExpireTime 为缓存有效时间ms
    menuStore.getAdminResList(data, { method: 'get', cache: true, setExpireTime: 30000 });
  };
  const handleClickCacheDefault = () => {
    // 测试缓存请求参数值不一样
    menuStore.getAdminResList(data, { cache: true });
  };

  const { resList = [] } = menuStore;

  return (
    <div>
      <button onClick={handleClick}>request正常请求</button>
      <br />
      <button onClick={handleClickCancel}>request取消请求</button>
      <br />
      <button onClick={handleClickRetry}>request请求重发</button>
      <br />
      <button onClick={handleClickCache}>request缓存请求带参数</button>
      <br />
      <button onClick={handleClickCacheDefault}>request缓存请求默认</button>
      <br />
      <button onClick={handleClickRetry2}>request请求重发(plugin)</button>
      <br />
      <button onClick={handleClickThrottle}>request请求节流(plugin)</button>
      <br />
      DemoRequest: <span>{resList[0]?.resourceName}</span>
    </div>
  );
}

export default inject('menuStore')(observer(DemoRequest));

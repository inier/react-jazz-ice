import React from 'react';
import { inject, observer } from 'mobx-react';
import { Avatar, Card } from '@alifd/next';

function DemoRequest(props) {
  const { menuStore, demoStore } = props;
  const data = { x: 101 };
  let userInfo = {};

  React.useEffect(() => {
    userInfo = demoStore.getUser();
  }, []);
  const { avatar, name } = userInfo;

  const handleClickLocation = () => {
    demoStore.getIP();
  };
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
    <>
      <Card free>
        <Card.Header title="状态管理 - 全局状态" />
        <Card.Divider />
        <Card.Content>
          <Avatar size="small" src={avatar} onClick={handleClick} />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </Card.Content>
      </Card>
      <Card free>
        <Card.Header title="请求处理" />
        <Card.Divider />
        <Card.Content>
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
        </Card.Content>
      </Card>
    </>
  );
}

export default inject('demoStore', 'menuStore')(observer(DemoRequest));

import React, { useState } from 'react';
import { useObserver, Observer, useLocalStore } from 'mobx-react';
import { Avatar, Button } from '@alifd/next';
import { useMobxStore } from '@/hooks';

function FuncComponent(props) {
  const stores = useMobxStore();
  const { menuStore, demoStore } = stores.stores;
  const [userInfo, setUserInfo] = useState({});
  const data = { x: 101 };

  React.useEffect(() => {
    demoStore.getUser().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const handleClick = () => {
    // 正常请求
    menuStore.getAdminResList(data, { loading: true });
  };

  const { avatar, name } = userInfo;
  const { resList = [] } = menuStore;

  return (
    <>
      <Avatar size="small" src={avatar} />
      <span style={{ marginLeft: 10 }}>{name}</span>
      <br />
      <Button onClick={handleClick}>点击获取信息</Button>
      <span>{resList[0]?.resourceName}</span>
    </>
  );
}

// 方法1
function Demo2() {
  const localStore = useLocalStore(() => store);
  return useObserver(() => <div onClick={localStore.setCount}>{localStore.count}</div>);
}

// 方法2，更新Observer包裹的位置，注意这里包裹的必须是一个函数
function Demo3() {
  const localStore = useLocalStore(() => store);
  return <Observer>{() => <span>{localStore.count}</span>}</Observer>;
}

export default FuncComponent;

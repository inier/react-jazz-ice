import React, { useEffect } from 'react';
import { useObserver, Observer, useLocalObservable } from 'mobx-react';
import { Avatar, Button } from '@alifd/next';
import { useMobxStore } from '@/hooks';
import stores from '@/stores';

function FuncComponent(props) {
  const { menuStore, demoStore } = useMobxStore();

  React.useEffect(() => {
    demoStore.getUser();
  }, []);

  const handleClick = () => {
    const data = { x: 101 };
    // 正常请求
    menuStore.getAdminResList(data);
  };

  const { avatar, name } = demoStore.userInfo;
  const { resList = [] } = menuStore;

  return (
    <>
      <p>func component + mobx hook</p>
      <div>
        <Avatar size="small" src={avatar} />
        <span style={{ marginLeft: 10 }}>{name}</span>
      </div>
      <br />
      <Button onClick={handleClick}>点击获取信息</Button>
      <span>{resList[0]?.resourceName}</span>
      <hr />
      <Demo2 />
      <hr />
      <Demo3 />
    </>
  );
}

// 方法1
function Demo2() {
  const localStore = useLocalObservable(() => stores.demoStore);
  useEffect(() => {
    localStore.getUser();
  }, []);

  return useObserver(() => <div>{localStore?.userInfo?.name}</div>);
}

// 方法2，更新Observer包裹的位置，注意这里包裹的必须是一个函数
function Demo3() {
  const localStore = useLocalObservable(() => stores.menuStore);

  useEffect(() => {
    localStore.getAdminResList({ x: 101 });
  }, []);
  return <Observer>{() => <span>{localStore?.resList[0]?.resourceName}</span>}</Observer>;
}

export default FuncComponent;

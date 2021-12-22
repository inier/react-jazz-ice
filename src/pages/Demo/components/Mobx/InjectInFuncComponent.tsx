import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Avatar, Button } from '@alifd/next';

function FuncComponent(props) {
  const { menuStore, demoStore } = props;
  const [userInfo, setUserInfo] = useState({ avatar: '', name: 'xxx' });

  React.useEffect(() => {
    demoStore.getUser().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const handleClick = () => {
    const data = { x: 101 };
    // 正常请求
    menuStore.getAdminResList(data);
  };

  const { avatar, name } = userInfo;
  const { resList = [] } = menuStore;

  return (
    <>
      <p>func component + mobx inject</p>
      <div>
        <Avatar size="small" src={avatar} />
        <span style={{ marginLeft: 10 }}>{name}</span>
      </div>
      <br />
      <Button onClick={handleClick}>点击获取信息</Button>
      <span>{resList[0]?.resourceName}</span>
    </>
  );
}

export default inject('demoStore', 'menuStore')(observer(FuncComponent));

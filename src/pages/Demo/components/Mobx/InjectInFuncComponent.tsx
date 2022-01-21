import React from 'react';

import { inject, observer } from 'mobx-react';
import { Avatar, Button } from '@alifd/next';

function FuncComponent(props) {
  const { demoStore } = props;
  const { avatar, name } = demoStore.userInfo;

  const handleClick = () => {
    demoStore.getUser();
  };

  return (
    <>
      <p>func component + mobx inject</p>
      <br />
      <Button onClick={handleClick}>点击获取信息</Button>
      <div>
        <Avatar size="small" src={avatar} />
        <span style={{ marginLeft: 10 }}>{name}</span>
      </div>
    </>
  );
}

export default inject('demoStore')(observer(FuncComponent));

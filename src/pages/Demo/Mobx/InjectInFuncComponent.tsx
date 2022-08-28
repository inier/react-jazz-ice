import React from 'react';

import { Avatar } from '@alifd/next';
import { inject, observer } from 'mobx-react';

const FuncComponent = (props) => {
  const { userStore } = props;
  const { avatar, name } = userStore.userInfo;

  return (
    <>
      <p>func component + mobx inject</p>
      <div>
        <Avatar size="small" src={avatar} />
        <span style={{ marginLeft: 10 }}>{name}</span>
      </div>
    </>
  );
};

export default inject('userStore')(observer(FuncComponent));

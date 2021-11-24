import React from 'react';
import { Avatar, Card } from '@alifd/next';
import { inject, observer } from 'mobx-react';

const UserInfo = ({ demoStore }) => {
  let userInfo = {};
  React.useEffect(() => {
    userInfo = demoStore.getUser();
  }, []);

  const { avatar, name } = userInfo;
  const handleClick = () => {
    demoStore.getIP();
  };
  return (
    <Card free>
      <Card.Header title="状态管理 - 全局状态" />
      <Card.Divider />
      <Card.Content>
        <Avatar size="small" src={avatar} onClick={handleClick} />
        <span style={{ marginLeft: 10 }}>{name}</span>
      </Card.Content>
    </Card>
  );
};

export default inject('demoStore')(observer(UserInfo));

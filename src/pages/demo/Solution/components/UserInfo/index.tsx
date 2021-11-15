import { Avatar, Card } from '@alifd/next';
import {inject, observer, } from 'mobx-react';

const UserInfo = ({userStore}) => {
  let userInfo = {};
  React.useEffect(() => {
     userInfo  = userStore.getUser();
  }, [])

  const {avatar, name} = userInfo;

  return (
    <Card free>
      <Card.Header title="状态管理 - 全局状态" />
      <Card.Divider />
      <Card.Content>
        <Avatar size="small" src={avatar} />
        <span style={{ marginLeft: 10 }}>{name}</span>
      </Card.Content>
    </Card>
  );
};

export default inject('userStore')(observer(UserInfo));

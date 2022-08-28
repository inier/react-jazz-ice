import React, { Component } from 'react';

import { Avatar } from '@alifd/next';
import { inject, observer } from 'mobx-react';

import { UserStore, MenuStore } from '@/stores';

interface IProps {
  userStore: UserStore;
  menuStore: MenuStore;
}

interface IStates {
  userInfo: IUserInfo;
}

interface IUserInfo {
  avatar: string;
  name: string;
}

@inject('userStore', 'menuStore')
@observer
class ClassComponent extends Component<IProps, IStates> {
  render() {
    const { userStore } = this.props;
    const { avatar, name } = userStore.userInfo;

    return (
      <>
        <p>class component + mobx inject</p>
        <div>
          <Avatar size="small" src={avatar} />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </div>
      </>
    );
  }
}

export default ClassComponent;

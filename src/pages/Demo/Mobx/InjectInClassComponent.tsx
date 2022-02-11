import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'ice';
import { Avatar, Button } from '@alifd/next';
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
@withRouter
@observer
class ClassComponent extends Component<IProps, IStates> {
  handleClick = () => {
    const { userStore } = this.props;
    userStore.getUser().then((res: IUserInfo) => {
      this.setState({
        userInfo: res,
      });
    });
  };

  render() {
    const { userStore } = this.props;
    const { avatar, name } = userStore.userInfo;

    return (
      <>
        <p>class component + mobx inject</p>
        <br />
        <Button onClick={this.handleClick}>点击获取信息</Button>
        <div>
          <Avatar size="small" src={avatar} />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </div>
      </>
    );
  }
}

export default ClassComponent;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'ice';
import { Avatar, Button } from '@alifd/next';
import { DemoStore, MenuStore } from '@/stores';

interface IProps {
  demoStore: DemoStore;
  menuStore: MenuStore;
}

interface IStates {
  userInfo: IUserInfo;
}

interface IUserInfo {
  avatar: string;
  name: string;
}

@inject('demoStore', 'menuStore')
@withRouter
@observer
class ClassComponent extends Component<IProps, IStates> {
  handleClick = () => {
    const { demoStore } = this.props;
    demoStore.getUser().then((res: IUserInfo) => {
      this.setState({
        userInfo: res,
      });
    });
  };

  render() {
    const { demoStore } = this.props;
    const { avatar, name } = demoStore.userInfo;

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

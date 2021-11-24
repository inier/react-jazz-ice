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
  userInfo: object;
}

@inject('demoStore', 'menuStore')
@withRouter
@observer
class ClassComponent extends Component<IProps, IStates> {
  state = {
    userInfo: {},
  };
  componentDidMount() {
    const { demoStore } = this.props;

    demoStore.getUser().then((res) => {
      this.setState({
        userInfo: res,
      });
    });
  }
  handleClick = () => {
    const { menuStore } = this.props;
    const data = { x: 101 };

    // 正常请求
    menuStore.getAdminResList(data, { loading: true });
  };

  render() {
    const { userInfo } = this.state;
    const { menuStore } = this.props;
    const { avatar, name } = userInfo;
    const { resList = [] } = menuStore;

    return (
      <>
        <p>class component + mobx inject</p>
        <div>
          <Avatar size="small" src={avatar} />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </div>
        <br />
        <Button onClick={this.handleClick}>点击获取信息</Button>
        <span>{resList[0]?.resourceName}</span>
      </>
    );
  }
}

export default ClassComponent;

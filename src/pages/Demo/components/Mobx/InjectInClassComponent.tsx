import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Avatar, Button } from '@alifd/next';

@inject('demoStore', 'memuStore')
@withRouter
@observer
class ClassComponent extends Component {
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
        <Avatar size="small" src={avatar} />
        <span style={{ marginLeft: 10 }}>{name}</span>
        <br />
        <Button onClick={this.handleClick}>点击获取信息</Button>
        <span>{resList[0]?.resourceName}</span>
      </>
    );
  }
}

export default ClassComponent;

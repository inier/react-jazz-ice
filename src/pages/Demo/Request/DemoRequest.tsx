import React from 'react';

import { Avatar } from '@alifd/next';
import { observer, useLocalObservable } from 'mobx-react';

import demoStore from '../stores/DemoStore';

let timestamp = +new Date();

const DemoRequest = (props) => {
  const { id, title, name, data = { x: 100 }, options = {} } = props;
  const localStore = useLocalObservable(() => demoStore);
  const { avatar, name: username } = localStore.userInfo;
  const handleRefresh = () => {
    timestamp = +new Date();
  };
  const handleClick = () => {
    localStore.getUser({ ...data, name: `request-${id}-${timestamp}` }, options);
  };

  return (
    <div>
      <h6>{title}</h6>
      <div>
        <button onClick={handleClick}>{name}</button>
        <button onClick={handleRefresh}>刷新时间戳</button>
        <div>
          data: {JSON.stringify(data)}, options：{JSON.stringify(options)}
        </div>
        <div>
          {id}-result:
          <div>
            <Avatar size="small" src={avatar} />
            <span style={{ marginLeft: 10 }}>{username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(DemoRequest);

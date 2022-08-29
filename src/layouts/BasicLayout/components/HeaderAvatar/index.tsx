import React from 'react';

import { Avatar, Overlay, Menu, Icon } from '@alifd/next';

import { useMobxStores } from '@/hooks';

import styles from './index.module.scss';

const { Item } = Menu;
const { Popup } = Overlay;

export interface Props {
  name: string;
  avatar: string;
  desc: string;
}

const UserProfile = ({ name, avatar, desc }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={avatar} alt="用户头像" />
      </div>
      <div className={styles.content}>
        <h4>{name}</h4>
        <span>{desc}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props: Props) => {
  const { userStore } = useMobxStores();
  const { name, avatar } = userStore.userInfo;

  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <Avatar size="small" src={avatar} alt="用户头像" />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </div>
      }
      triggerType="click"
    >
      <div className={styles.avatarPopup}>
        <UserProfile {...userStore.userInfo} />
        <Menu
          className={styles.menu}
          onItemClick={(selectedKey) => {
            if (selectedKey === '0-0') {
              userStore.loginOut();
            }
          }}
        >
          <Item>
            <Icon size="small" type="exit" />
            退出
          </Item>
        </Menu>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  name: '',
  desc: '',
  avatar: '',
};

export default HeaderAvatar;

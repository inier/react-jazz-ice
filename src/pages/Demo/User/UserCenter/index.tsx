import { useMemo, useEffect } from 'react';
import { PageContainer, Text } from '@/components';
import { useMobxStore } from '@/hooks';
import { Avatar, Form, Tab } from '@alifd/next';
import { observer } from 'mobx-react';
import { getFirstCapitalizedLetter } from '@/utils';

const { Item: TabPane } = Tab;

const UserCenterPage = observer(() => {
  const { userStore } = useMobxStore();
  useEffect(() => {
    userStore.getUser();
  }, []);
  const currentUser = userStore.userInfo;

  const userNameInitials = useMemo(() => {
    if (currentUser?.name) {
      return getFirstCapitalizedLetter(currentUser.name);
    }
    return '';
  }, [currentUser?.name]);

  return (
    <PageContainer>
      <Tab defaultActiveKey="1">
        <TabPane title="基本信息" key="1">
          <Form layout="vertical" style={{ margin: '20px 0' }} className="form-vertical--preview">
            <Form.Item>
              <Avatar shape="circle" size={72} style={{ backgroundColor: '#ffa22d' }}>
                {userNameInitials}
              </Avatar>
            </Form.Item>
            <Form.Item label="姓名">
              <Text>{currentUser?.name}</Text>
            </Form.Item>
            <Form.Item label="邮箱">
              <Text>{currentUser?.email}</Text>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane title="其他信息" key="2">
          <Form layout="vertical" style={{ margin: '20px 0' }} className="form-vertical--preview">
            <Form.Item label="注册时间">
              <Text>{currentUser?.createTime}</Text>
            </Form.Item>
            <Form.Item label="状态">
              <Text>{['正常', '冻结'][Number(currentUser?.status || -1)]}</Text>
            </Form.Item>
            <Form.Item label="绑定手机">
              <Text>{currentUser?.mobile}</Text>
            </Form.Item>
            <Form.Item label="绑定邮箱">
              <Text>{currentUser?.email}</Text>
            </Form.Item>
          </Form>
        </TabPane>
      </Tab>
    </PageContainer>
  );
});

UserCenterPage.displayName = 'UserCenterPage';

export default UserCenterPage;

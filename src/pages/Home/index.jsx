import { memo } from 'react';

import { Avatar } from '@alifd/next';
import { observer } from 'mobx-react';

import { PageContainer } from '@/components';
import { useMobxStore } from '@/hooks';

import styles from './index.module.scss';

const getGreeting = () => {
  const now = new Date();
  const times = now.getHours();
  if (times >= 6 && times < 12) return `${+now}, 早上好`;
  if (times >= 12 && times < 18) return `${+now}, 下午好`;
  if ((times >= 18 && times < 24) || (times <= 24 && times < 6)) return `${+now}, 晚上好`;
};

const HomePage = observer(() => {
  const { userStore } = useMobxStore();
  const { userInfo } = userStore;
  return (
    <PageContainer showFooter bgColor={false}>
      <div className={styles.container}>
        <div className={styles.greet}>
          <Avatar size={40} className={styles.avatar} src={userInfo?.avatar} />
          <span>
            {getGreeting()}，{userInfo?.name}，开心每一天！
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.welcome}>
            <div className={styles.welcomeTxt}>Welcome</div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
});

HomePage.displayName = 'HomePage';

export default memo(HomePage);

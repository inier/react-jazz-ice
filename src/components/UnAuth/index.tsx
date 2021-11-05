import { useHistory } from 'ice';
import { Button } from '@alifd/next';
import styles from './index.module.scss';

const UnAuth = () => {
  const history = useHistory();

  return (
    <div className={styles.exceptionContent}>
      <img src={require('./images/UnAuth.svg')} className={styles.imgException} alt="页面不存在" />
      <div className="prompt">
        <h3 className={styles.title}>抱歉，您没有权限</h3>
        <p className={styles.description}>如有需求，请联络管理员分配权限</p>
        <Button onClick={() => history.goBack()}>返回</Button>
      </div>
    </div>
  );
};
UnAuth.displayName = 'UnAuth';

export default UnAuth;

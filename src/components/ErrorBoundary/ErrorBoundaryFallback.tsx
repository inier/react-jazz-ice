import styles from './ErrorBoundary.module.scss';
// 图片引入
import BG_1 from './img/bc-1.png';
import BG_2 from './img/bc-2.png';

interface IProps {
  componentStack: string;
  error?: any;
}

const ErrorBoundaryFallback = ({ componentStack = '', error = null }: IProps) => {
  return (
    <div className={styles.content}>
      <img className={styles.BG_1} src={BG_1} alt="err bg" />
      <img className={styles.BG_2} src={BG_2} alt="err bg" />
      <div className={styles.tips}>
        <div className={styles.left}>可能的原因:&nbsp;</div>
        <div className={styles.right}>
          <div>·&nbsp;网络信号弱</div>
          <div>·&nbsp;找不到请求网页</div>
          <div>·&nbsp;输入的网址不正确</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <div
          className={`${styles.refresh} ${styles.btn}`}
          onClick={() => {
            window.location.reload();
          }}
        >
          刷新本页
        </div>
        <div
          className={`${styles.home} ${styles.btn}`}
          onClick={() => {
            window.location.replace(`${window.location.origin}${PUBLIC_URL}`);
          }}
        >
          回到首页
        </div>
      </div>
      <div>
        <h2>错误详情</h2>
        <div>{error && JSON.stringify(error)}</div>
        <div>{componentStack}</div>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;

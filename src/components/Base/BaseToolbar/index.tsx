import { ReactNode } from 'react';

import styles from './index.module.scss';

/**
 * 功能栏
 */
interface IBaseToolbarProps {
  children?: ReactNode;
}
const BaseToolbar = (props: IBaseToolbarProps) => {
  return <div className={styles.BaseToolbar}>{props.children}</div>;
};

export default BaseToolbar;

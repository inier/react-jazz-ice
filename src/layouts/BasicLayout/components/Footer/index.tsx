import React from 'react';

import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      {/* <span className={styles.logo}>XXX</span>
      <br /> */}
      <span className={styles.copyright}>CopyrightÂ© 2021 XXXXX</span>
    </p>
  );
}

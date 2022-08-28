import React from 'react';

import styles from './index.module.scss';

export default const Footer = function Footer() {
  return (
    <p className={styles.footer}>
      {/* <span className={styles.logo}>XXX</span>
      <br /> */}
      <span className={styles.copyright}>Copyright© 2022 XXXXX</span>
    </p>
  );
})

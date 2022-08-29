import React, { useEffect, useState } from 'react';

import { Input, Form } from '@alifd/next';

import styles from './index.module.scss';

const { Item } = Form;

// 图片验证码组件
const PicCode = (props) => {
  const {
    username,
    disabled = false,
    service,
    placeholder = '请输入4位图形验证码',
    className = '',
    style = {},
  } = props;
  const [picCode, setPicCode] = useState('');
  const [timestamp, setTimestamp] = useState(`${+new Date()}`);

  useEffect(() => {
    if (!disabled && service) {
      setPicCode(service(username, timestamp));
    }

    return () => {
      setPicCode('');
    };
  }, [disabled, service, username, timestamp]);

  const handleImgClick = () => {
    if (service) {
      const tTimestamp = `${+new Date()}`;

      setPicCode(service(username, timestamp));
      setTimestamp(tTimestamp);
    }
  };
  const tDisabled = disabled || !picCode;

  return (
    <>
      <Item
        required
        requiredMessage="必填"
        length={4}
        lengthMessage="请输入4位图形验证码"
        lengthTrigger="onBlur"
        className={`${styles.picCodeWrap} ${className}`}
        style={style}
      >
        <Input
          trim
          hasClear
          hoverShowClear
          maxLength={4}
          name="picCode"
          size="large"
          className={styles.input}
          placeholder={placeholder}
        />
        {!tDisabled && (
          <div className={`${styles.img} ${styles.lg}`} onClick={handleImgClick}>
            <img src={picCode} alt="" />
          </div>
        )}
      </Item>
      <Item>
        <Input name="timestamp" value={timestamp} style={{ display: 'none' }} />
      </Item>
    </>
  );
};

export default PicCode;

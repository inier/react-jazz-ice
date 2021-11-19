import React, { useState, useEffect } from 'react';
import { Shell, Loading } from '@alifd/next';
import Iframe from './Iframe';
// import { urlParse } from '@utils';
import styles from './Iframe.module.scss';

export default ({ id, url: initialUrl, isRefresh = false, handleRefreshChange }) => {
  const [url, setUrl] = useState(initialUrl);
  const [visible, setVisible] = useState(true);

  const onRefresh = () => {
    const tUrl = url;
    setVisible(true);
    setUrl('');
    // 刷新地址
    setTimeout(() => {
      setUrl(tUrl);
    }, 1000);
  };

  function onClose() {
    setVisible(false);
  }

  useEffect(() => {
    // 当需要刷新时，执行刷新
    if (isRefresh) {
      onRefresh();
      // 重置刷新状态
      handleRefreshChange && handleRefreshChange(false);
    }
  });

  if (!url) {
    return null;
  }

  return (
    <Shell className={styles.iframeWrap}>
      <Loading
        visible={visible}
        onVisibleChange={onClose}
        style={{ position: 'absolute', top: '0', bottom: '0', right: '0', left: '0' }}
      />
      {/* <div
                rol="button"
                className={styles['btn-refresh']}
                onClick={() => {
                    onRefresh(url);
                }}
            >
                refresh
            </div> */}
      <Iframe
        id={`iframe-${id}`}
        width="100%"
        height="100%"
        url={url}
        scrolling="auto"
        className={styles.iframe}
        onLoad={() => {
          onClose();
        }}
        frameBorder="0"
        display="initial"
        position="relative"
        allowFullScreen
        style={{
          height: '100%',
          width: '100%',
          border: 'none',
        }}
      />
    </Shell>
  );
};

import React from 'react';

import { Loading, Message } from '@alifd/next';
import { observer } from 'mobx-react';

import { useMobxStore } from '@/hooks';

// loading图标和错误提示的组件
const ToastAndLoading = () => {
  const { loading, toastMsg } = useMobxStore('UIStore');

  if (toastMsg) {
    Message.error(toastMsg);
  }

  return (
    <>
      <Loading visible={!!loading} fullScreen />
      {/* <Message visible={!!toastMsg}>{toastMsg}</Message> */}
    </>
  );
};

export default observer(ToastAndLoading);

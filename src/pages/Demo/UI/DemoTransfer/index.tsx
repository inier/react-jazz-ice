import React, { useState } from 'react';

import { Button } from '@alifd/next';

import BaseTransfer from '@/components/Base/BaseTransfer';

import data from './data';

const DemoTransfer = () => {
  const handleOk = (e) => {};
  const handleCancel = () => {
    SetVisible(false);
  };
  const [visible, SetVisible] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => SetVisible(true)}>显示</Button>
      <BaseTransfer
        visible={visible}
        DialogTitle="测试"
        titles={['导出字段', '选中字段']}
        okTitle="生成报表"
        dataSource={data}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default DemoTransfer;

import React, { useState } from 'react';

import { Transfer, Dialog } from '@alifd/next';

import styles from './index.module.scss';

interface IProps {
  /** 数据源 */
  dataSource: object[];
  /** 返回值 */
  value?: string[];
  /** 穿梭框标题 */
  titles?: any[];
  /** 显示隐藏 */
  visible: boolean;
  /** 确定按钮文字 */
  okTitle?: string;
  /** 取消按钮文字 */
  cancelTitle?: string;
  /** 弹出框标题 */
  DialogTitle: string;
  /** 确定方法 */
  onOk: (param) => void;
  /** 点击取消方法 */
  onCancel: () => void;
}

const BaseTransfer = (props: IProps) => {
  const { dataSource, value, titles, DialogTitle, visible, okTitle, cancelTitle, onOk, onCancel } = props;
  const [data, SetData] = useState<any[]>([]);

  return (
    <Dialog
      v2
      visible={visible}
      onOk={() => {
        onOk(data);
      }}
      width="850px"
      height="600px"
      onClose={onCancel}
      okProps={{ children: okTitle || '确定', disabled: data && data.length === 0 }}
      cancelProps={{ children: cancelTitle || '取消' }}
      title={DialogTitle}
    >
      <Transfer
        value={data}
        titles={titles}
        notFoundContent="暂无字段数据"
        sortable
        className={styles['next-dialog']}
        dataSource={dataSource}
        showSearch
        onChange={(e) => {
          SetData([...e]);
        }}
        itemRender={(item) => {
          return (
            <>
              <span>{item.label}</span>
              {item.extra && <span style={{ color: '#999' }}>({item.extra})</span>}
            </>
          );
        }}
        listStyle={{ width: '350px', minHeight: '330px' }}
      />
    </Dialog>
  );
};

export default BaseTransfer;

import React, { ReactNode } from 'react';

import { Dialog } from '@alifd/next';

interface IProps {
  /** 显示隐藏 */
  visible: boolean;
  /** 内容 */
  content: ReactNode;
  /** 标题 */
  title?: string;
  /** 点击确定按钮事件 */
  onOk: () => void;
  /** 设置显示隐藏参数 */
  SetVisible: (value: boolean) => void;
}
const BaseDelete = (props: IProps) => {
  const { visible, content, title, onOk, SetVisible, ...rest } = props;
  return (
    <Dialog title={title || '提示'} visible={visible} onOk={onOk} onCancel={() => SetVisible(false)} {...rest}>
      {content}
    </Dialog>
  );
};

export default BaseDelete;

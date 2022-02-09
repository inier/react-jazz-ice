import React from 'react';

import { Icon } from '@alifd/next';

export const LeftOutlined = ({ title = '返回', ...restProps }) => {
  return <Icon type="arrow-left" title={title} {...restProps} />;
};
export const RightOutlined = ({ title = '向右滚动', ...restProps }) => {
  return <Icon type="arrow-right" title={title} {...restProps} />;
};
export const ReloadOutlined = ({ title = '刷新', ...restProps }) => {
  return <Icon type="refresh" size="small" title={title} {...restProps} />;
};

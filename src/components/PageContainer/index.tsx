import React from 'react';

/**
 * 页面内容布局组件
 */
const PageContainer = ({ children }) => {
  return <div style={{ flex: 1 }}>{children}</div>;
};

PageContainer.displayName = 'PageContainer';

export default PageContainer;

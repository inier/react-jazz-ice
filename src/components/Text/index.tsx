import React from 'react';

/** 空文本边界处理：使用其他字符替换 */
const Text = ({ children, replace = '--' }) => (
  <>{[null, undefined, false, ''].includes(children) ? replace : children}</>
);

Text.displayName = 'Text';

export default Text;

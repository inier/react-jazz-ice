import React from 'react';

/** 空文本边界处理：使用其他字符替换 */
function Text({ children, replace = '--' }) {
  return <>{[null, undefined, false, ''].includes(children) ? replace : children}</>;
}

Text.displayName = 'Text';

export default Text;

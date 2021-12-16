import React from 'react';

/** 空文本边界处理：使用其他字符替换 */
const TextEdge = ({ children, replace = '--' }) => (
  <>{[null, undefined, false, ''].includes(children) ? replace : children}</>
);

TextEdge.displayName = 'EmptyText';

export default TextEdge;

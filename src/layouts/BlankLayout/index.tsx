import React from 'react';

import { Shell } from '@alifd/next';

export default const BlankLayout = function BlankLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell
      style={{
        minHeight: '100vh',
      }}
      type="brand"
    >
      <Shell.Content>{children}</Shell.Content>
    </Shell>
  );
})

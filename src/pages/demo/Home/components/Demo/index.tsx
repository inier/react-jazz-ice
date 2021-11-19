import React from 'react';
import DemoUseRequest from './useRequest';
import DemoRequest from './request';

function Demo() {
  return (
    <div>
      <DemoUseRequest p={1} />
      <DemoUseRequest p={2} />
      <DemoRequest />
    </div>
  );
}

export default Demo;

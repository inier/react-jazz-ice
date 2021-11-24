import React from 'react';
import DemoUseRequest from './useRequest';
import DemoRequest from './request';

function Request() {
  return (
    <div>
      <DemoUseRequest p={1} />
      <DemoUseRequest p={2} />
      <br />
      <DemoRequest />
    </div>
  );
}

export default Request;

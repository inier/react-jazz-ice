import React from 'react';
import DemoUseRequest from './useRequest';
import DemoRequest from './request';

function Request() {
  return (
    <div>
      <DemoUseRequest id={1} options={{ throttleInterval: 5000, refreshOnWindowFocus: true }} />
      <DemoUseRequest
        id={2}
        options={{ cacheKey: `getResList-1`, throttleInterval: 5000, refreshOnWindowFocus: true }}
      />
      <h2>
        更多用法：
        <a href="https://ahooks.js.org/zh-CN/hooks/async#%E9%BB%98%E8%AE%A4%E8%AF%B7%E6%B1%82" target="_blank">
          详情
        </a>
      </h2>
      <br />
      <DemoRequest />
    </div>
  );
}

export default Request;

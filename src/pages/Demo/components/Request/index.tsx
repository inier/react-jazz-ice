import React from 'react';
import { Tab } from '@alifd/next';
import DemoUseRequest from './useRequest';
import DemoRequest from './request';

function Request() {
  const tabs = [
    {
      tab: 'useRequest用法',
      key: 'ccm',
      content: (
        <div>
          <DemoUseRequest id={1} options={{ throttleInterval: 5000, refreshOnWindowFocus: true }} />
          <DemoUseRequest id={2} options={{ cacheKey: `getResList-1`, refreshOnWindowFocus: true }} />
          更多用法：
          <a href="https://ahooks.js.org/zh-CN/hooks/async#%E9%BB%98%E8%AE%A4%E8%AF%B7%E6%B1%82" target="_blank">
            详情
          </a>
        </div>
      ),
    },
    {
      tab: 'request用法',
      key: 'cfm',
      content: (
        <div>
          <DemoRequest id={11} title={'正常请求'} name={'request正常请求'} />
          <DemoRequest
            id={12}
            title={'正常请求(关闭loading)'}
            name={'request正常请求'}
            data={{ x: 300, y: 300 }}
            options={{ loading: false }}
          />
          <DemoRequest
            id={13}
            title={'测试取消请求'}
            name={'request可取消重复请求'}
            options={{ loading: false, cancelRequest: true }}
          />
          <DemoRequest
            id={14}
            title={'测试请求重发，除了原请求外还会重发3次'}
            name={'request请求重发'}
            options={{ loading: false, retry: 3, retryDelay: 1000 }}
          />
          <DemoRequest
            id={15}
            title={'测试缓存请求带参数：setExpireTime 为缓存有效时间ms'}
            name={'request缓存请求带参数'}
            options={{ loading: false, method: 'get', cache: true, setExpireTime: 30000 }}
          />
          <DemoRequest
            id={16}
            title={'测试缓存请求参数值不一样'}
            name={'request缓存请求(默认)'}
            options={{ loading: false, cache: true }}
          />
        </div>
      ),
    },
  ];

  return (
    <Tab>
      {tabs.map((item) => (
        <Tab.Item key={item.key} title={item.tab}>
          {item.content}
        </Tab.Item>
      ))}
    </Tab>
  );
}

export default Request;

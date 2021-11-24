import React from 'react';
import { Tab } from '@alifd/next';
import InjectInClassComponent from './InjectInClassComponent';
import InjectInFuncComponent from './InjectInFuncComponent';
import HookInFuncComponent from './HookInFuncComponent';

function Mobx() {
  const tabs = [
    { tab: 'class + mobx inject', key: 'ccm', content: <InjectInClassComponent /> },
    { tab: 'func + mobx inject', key: 'cfm', content: <InjectInFuncComponent /> },
    { tab: 'func + mobx hook', key: 'chm', content: <HookInFuncComponent /> },
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

export default Mobx;

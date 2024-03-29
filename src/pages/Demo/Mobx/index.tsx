import React from 'react';

import { Tab } from '@alifd/next';

import HookInFuncComponent from './HookInFuncComponent';
import InjectInClassComponent from './InjectInClassComponent';
import InjectInFuncComponent from './InjectInFuncComponent';

const Mobx = () => {
  const tabs = [
    { tab: 'func + mobx hook', key: 'chm', content: <HookInFuncComponent /> },
    { tab: 'func + mobx inject', key: 'cfm', content: <InjectInFuncComponent /> },
    { tab: 'class + mobx inject', key: 'ccm', content: <InjectInClassComponent /> },
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
};

export default Mobx;

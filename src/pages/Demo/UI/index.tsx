import React from 'react';

import { Tab } from '@alifd/next';

import { UIList } from './config';

const UI = () => {
  return (
    <Tab>
      {UIList.map((item) => (
        <Tab.Item key={item.tab} title={item.tab}>
          {item.content}
        </Tab.Item>
      ))}
    </Tab>
  );
};

export default UI;

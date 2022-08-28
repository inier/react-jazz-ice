import React from 'react';

import { ResponsiveGrid, Card } from '@alifd/next';

import PageHeader from '@/components/PageHeader';

import DemoMobx from './Mobx';
import DemoRequest from './Request';
import DemoUI from './UI';

const { Cell } = ResponsiveGrid;

const list = [
  {
    title: 'UI示例',
    content: <DemoUI />,
  },
  {
    title: '请求示例',
    content: <DemoRequest />,
  },
  {
    title: 'mobx状态示例',
    content: <DemoMobx />,
  },
];

const DemoList = () => {
  return (
    <ResponsiveGrid gap={0}>
      <Cell colSpan={12}>
        <PageHeader breadcrumbs={[{ name: 'example' }, { name: '示例' }]} />
      </Cell>
      <Cell colSpan={12}>
        {list.map((item) => {
          return (
            <Card free key={item.title}>
              <Card.Header title={item.title} />
              <Card.Divider />
              <Card.Content>{item.content}</Card.Content>
            </Card>
          );
        })}
      </Cell>
    </ResponsiveGrid>
  );
};

export default DemoList;

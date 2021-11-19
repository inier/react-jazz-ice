import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import Demo from './components/Demo';

const { Cell } = ResponsiveGrid;

const Workplace = () => {
  return (
    <ResponsiveGrid gap={0}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: 'entry' }, { name: '首页' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <Demo />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Workplace;

import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import Tasks from './components/Tasks';
import UserInfo from './components/UserInfo';
import SelectLang from './components/SelectLang';

// store路径不满足约定条件，需自行添加包裹Provider
// https://ice.work/docs/guide/basic/store/#%E5%9C%A8%E5%85%B6%E4%BB%96%E5%9C%B0%E6%96%B9%E4%BD%BF%E7%94%A8-store
import store from './store';
const { Provider } = store;

const { Cell } = ResponsiveGrid;

const Solution = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader title="官方推荐方案" description="包括状态管理方案、多语言切换的示例" breadcrumbs={[]} />
      </Cell>

      <Cell colSpan={12}>
        <Provider>
          <Tasks />
        </Provider>
      </Cell>

      <Cell colSpan={12}>
        <UserInfo />
      </Cell>

      <Cell colSpan={12}>
        <SelectLang />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Solution;

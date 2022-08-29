import React from 'react';

import { Tab } from '@alifd/next';
import { TabProps } from '@alifd/next/types/tab';

import { IBaseTabs } from '../Basetype';

import styles from './index.module.scss';

interface BaseTabsTypes {
  tabsList: IBaseTabs[];
  style?: React.CSSProperties;
  tabsProps?: TabProps;
  key?: string;
  unmountInactiveTabs?: boolean;
}
function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

const BaseTabs: React.FunctionComponent<BaseTabsTypes> = ({ tabsList, style, tabsProps, unmountInactiveTabs }) => {
  return (
    <div style={style}>
      {tabsList && tabsList.length > 0 ? (
        <Tab unmountInactiveTabs={unmountInactiveTabs} size="small" {...tabsProps} className={styles['tab']}>
          {tabsList.map((val: IBaseTabs, index: number) => (
            <Tab.Item title={val.title} key={val.key ? val.key : index.toString()}>
              {isFunction(val.item) ? val.item() : val.item}
            </Tab.Item>
          ))}
        </Tab>
      ) : null}
    </div>
  );
};

export default BaseTabs;

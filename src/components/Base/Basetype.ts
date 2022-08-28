import { ReactNode } from 'react';

import { ItemProps } from '@alifd/next/types/form';

export interface SelectOptionsProps {
  name: string | number;
  value: string | number;
  id?: string | number;
}

export interface IBaseTabs {
  title: string;
  item: () => ReactNode;
  key?: string;
  forceRender?: boolean; // 被隐藏式是否渲染dom结构
}

export interface BaseFormFilter extends ItemProps {
  type: string;
  otherParams?: any;
  options?: SelectOptionsProps[];
  actor?: ReactNode;
}

import React, { useState, useCallback, useEffect, useRef, ReactNode } from 'react';

import { Box, Balloon } from '@alifd/next';
import { PaginationProps } from '@alifd/next/types/pagination';

import BaseFilter from '@/components/Base/BaseFilter';
import BaseTable from '@/components/Base/BaseTable';
import BaseToolbar from '@/components/Base/BaseToolbar';

import { BaseFormFilter, SelectOptionsProps } from '../Basetype';

interface IProps {
  columns: any[]; // 表格colum项
  param?: {}; // 传入参数
  tableData: any[]; // table数据源
  getTable: (value?: any) => void;
  formList: BaseFormFilter[]; // 该属性传空数组，不显示高级筛选按钮
  placeholder: string; // 输入框placeholder
  searchValue: string; // 输入框参数
  setParam: (value) => void; // 更换param参数
  handleSubmit?: (value?: any, type?: string) => void;
  total: number; // 总条数
  node?: ReactNode;
  fixHeight?: number; // 页面离底部高度
  propCurrent?: number; // 页码
  searchVisible?: boolean /** 不显示搜索框 */;
}

const BaseMoreTable = (props: IProps) => {
  const {
    columns,
    param,
    tableData,
    placeholder,
    getTable,
    setParam,
    handleSubmit,
    searchValue,
    node,
    total,
    formList,
    fixHeight,
    propCurrent,
    searchVisible,
    ...rest
  } = props;
  const [loading, setLoading] = useState(false);
  const handlePageSizeChange = (pageSize) => setPagination({ ...pagination, pageSize, current: 1 });
  const onPageChange = (current) => setPagination({ ...pagination, current });
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 50,
    total,
  });
  const { current, pageSize } = pagination;
  const onSearch = (value) => {
    setParam({ ...param, [searchValue]: value });
    setPagination({ ...pagination, current: 1 });
  };
  const submitHandle = (value) => {
    setPagination({ ...pagination, current: 1 });
    setParam({ ...param, ...value });
  };

  useEffect(() => {
    getTable({ param, current, size: pageSize });
  }, [param, current, pageSize]);

  useEffect(() => {
    setPagination({ ...pagination, total });
  }, [total]);

  useEffect(() => {
    if (current === 1 && propCurrent !== 1) {
      getTable({ param, current, size: pageSize });
      return;
    }
    setPagination({ ...pagination, current: 1 });
  }, [propCurrent]);

  return (
    <Box>
      <Box direction="row" justify="space-between">
        <BaseToolbar>{node}</BaseToolbar>
        <BaseFilter
          searchPlaceholder={placeholder}
          onSearch={onSearch}
          formList={formList}
          searchVisible={searchVisible}
          submitHandle={handleSubmit || submitHandle}
        />
      </Box>
      <BaseTable
        dataSource={tableData}
        isShowPagination
        pagination={{ ...pagination, onPageSizeChange: handlePageSizeChange, onChange: onPageChange }}
        loading={loading}
        columns={columns}
        fixHeight={fixHeight || 160}
        {...rest}
      />
    </Box>
  );
};

export default BaseMoreTable;

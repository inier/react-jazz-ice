import React, { useEffect, useState } from 'react';

import { Box, Loading, Pagination, Table } from '@alifd/next';
import { PaginationProps } from '@alifd/next/types/pagination';
import { TableProps } from '@alifd/next/types/table';

import BaseNot from '@/components/Base/BaseNot';

import styles from './index.module.scss';

interface IBaseTablePage extends TableProps {
  pagination?: PaginationProps | false; // 分页
  loading: boolean;
  isShowPagination?: boolean; // 是否展示分页
  columns?: any[]; // 基础表格
  dataSource?: any[]; // 数据源
  padding?: number | any[] | undefined; // 表格padding
  fixHeight?: number; // =页面高度- table高度，table垂直两端对齐时，用于修正table占高
}
function getViewPortHeight(fixHeight) {
  return (document.documentElement.clientHeight || document.body.clientHeight) - 100 - fixHeight;
}
/**
 * @param props 接受Table基本属性
 * @returns  基础表格
 */
const BaseTable: React.FunctionComponent<IBaseTablePage> = (
  props: IBaseTablePage,
): JSX.Element => {
  const { columns, loading, isShowPagination, pagination, dataSource, children, fixHeight, padding, ...rest } = props;
  // console.log(columns);

  const widthList = {};
  const [tableWidth, setTableWidth] = useState(widthList);
  const [tableHeight] = useState(getViewPortHeight(fixHeight));
  // console.log('table', widthList);

  useEffect(() => {}, [tableWidth]);
  const handleColumns = (arr: any[]) => {
    const newJson = arr.map((item: any) => {
      return {
        ...item,
        asyncResizable: true,
        width: widthList[item.dataIndex],
        cell: item.cell ? item.cell : (value) => value || (typeof value === 'number' && '0') || '-',
        // align: item.align ? item.align : 'center',
        lock: item.dataIndex === 'action' ? 'right' : false,
      };
    });
    return newJson;
  };

  columns &&
    columns!.forEach((item) => {
      item.dataIndex === 'action'
        ? (widthList[item.dataIndex] = Number(item.width || 123))
        : (widthList[item.dataIndex] = Number(item.width || 200));
    });
  const [newColumns, setNewColumns] = useState<any[]>(handleColumns(columns || []) || []);
  const onResizeChange = async (dataIndex, value: number) => {
    if (!rest.onResizeChange) {
      const newWidth = tableWidth;
      newWidth[dataIndex] += value;
      await setTableWidth(newWidth);
      const data: any[] = [];
      newColumns &&
        newColumns.forEach((v) => {
          if (v.dataIndex === dataIndex) {
            data.push({ ...v, width: newWidth[dataIndex] });
          } else {
            data.push({ ...v });
          }
        });
      setNewColumns(data);
    }
  };

  if (fixHeight && fixHeight >= 0) {
    rest.maxBodyHeight = tableHeight;
  }

  return (
    <Box className={styles.Main} padding={padding}>
      <Loading visible={loading} style={{ display: 'block' }}>
        <Table.StickyLock
          className={styles.Table}
          columns={newColumns || []}
          dataSource={dataSource}
          tableLayout="fixed"
          size="small"
          fixedHeader
          emptyContent={<BaseNot />}
          onResizeChange={(dataIndex, width) => onResizeChange(dataIndex, width)}
          {...rest}
        >
          {children}
        </Table.StickyLock>
        {isShowPagination && (
          <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
            <div className={styles.total}>
              共<span>{pagination && pagination.total}</span>条数据
            </div>
            <Pagination
              pageSizeList={[20, 50, 100]}
              pageSizeSelector="dropdown"
              pageSizePosition="start"
              {...pagination}
            />
          </Box>
        )}
      </Loading>
    </Box>
  );
};

export default BaseTable;

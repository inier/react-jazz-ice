import { memo, useMemo } from 'react';
import { Box, Table, Tag } from '@alifd/next';
import { useActivate } from 'react-activation';
import { useRouteTabsContext } from '@/components/RouteTabs';

const Notice = () => {
  // console.log('================>NoticePage');
  useActivate(() => {
    // console.log('================>useActivate');
  });

  useRouteTabsContext();

  const tableData = useMemo(() => {
    const result = [];
    for (let i = 0; i < 500; i += 1) {
      result.push({
        key: Math.floor(Math.random() * 10000000000),
        name: `John Brown_${i}_${Math.floor(Math.random() * 1000000)}`,
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      });
    }
    return result;
  }, []);

  const tableRender = useMemo(() => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Box size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Box>
        ),
      },
    ];

    return <Table columns={columns} dataSource={tableData} pagination={false} />;
  }, [tableData]);

  return (
    <div>
      {tableRender}
      {tableData.map((item) => (
        <div key={item.key}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
};

export default memo(Notice);

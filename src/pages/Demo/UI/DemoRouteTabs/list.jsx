import { memo, useMemo, useState } from 'react';

import { Box, Table, Tag, Dialog } from '@alifd/next';

import { useActivate, useRouteTabsContext } from '@/hooks';

const Notice = () => {
  // console.log('================>NoticePage');
  useActivate(() => {
    // console.log('================>useActivate');
  });
  const [modalVisible, setModalVisible] = useState(false);

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

    return <Table columns={columns} dataSource={tableData} />;
  }, [tableData]);

  return (
    <div>
      <button
        onClick={() => {
          setModalVisible(true);
        }}
      >
        弹框测试按钮
      </button>
      {tableRender}
      {tableData.map((item) => (
        <div key={item.key}>{JSON.stringify(item)}</div>
      ))}
      <Dialog
        v2
        title="Welcome"
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <p>Start your business here by searching a popular product</p>
      </Dialog>
    </div>
  );
};

export default memo(Notice);

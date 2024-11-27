import { Table, Typography, Space, Button } from 'antd';

// import { Link } from 'react-router-dom';
// import { PATH_DASHBOARD } from '@/constants';

/**
 * Dictionary Config Page
 * @returns
 */
export const DictionaryManager = () => {
  const dataSource = [
    {
      key: '1',
      category: 'People',
      label: 'Mike',
      value: '110',
      sequence: 1,
    },
    {
      key: '2',
      category: 'People',
      label: 'Tony',
      value: '120',
      sequence: 2,
    },
    {
      key: '3',
      category: 'People',
      label: 'John',
      value: '130',
      sequence: 3,
    },
  ];

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Sequence',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button color="primary" variant="outlined">
            Update
          </Button>
          <Button color="danger" variant="outlined">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 " style={{ height: '80vh' }}>
      <Typography.Title className="m-0">Dictionary Config</Typography.Title>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

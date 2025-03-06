import { Button, Table, Popconfirm } from 'antd';

export const DSTable = ({ list, ds }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Driver',
      dataIndex: 'driver',
      key: 'driver',
    },
    {
      title: 'Host',
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: 'Port',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: 'Database',
      dataIndex: 'database',
      key: 'database',
    },
    {
      title: 'Instance',
      dataIndex: 'instance',
      key: 'instance',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '20%',
      render: (_, record) => {
        return (
          <span data-key={record.key}>
            <Button
              size="small"
              color="primary"
              variant="dashed"
              className="mr-2"
              onClick={() => ds.editDatasource(record)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the data source"
              description="Are you sure to delete this data source?"
              onConfirm={() => ds.deleteDatasource(record)}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" color="danger" variant="dashed">
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return <Table dataSource={list} columns={columns} />;
};

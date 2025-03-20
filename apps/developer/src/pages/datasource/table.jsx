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
      title: 'Is Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (_, record) => {
        return (
          <span
            className={
              record.isDefault ? 'font-bold' : 'font-thin text-gray-500'
            }
          >
            {record.isDefault ? 'Yes' : 'No'}
          </span>
        );
      },
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
            <Button
              size="small"
              color="primary"
              variant="dashed"
              className="mr-2"
              onClick={() => ds.testDatasource(record)}
            >
              Test
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

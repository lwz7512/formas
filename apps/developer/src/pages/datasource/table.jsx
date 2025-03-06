import { Button, Table } from 'antd';

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
    width: '30%',
    render: (_, record) => {
      return (
        <span data-key={record.key}>
          <Button
            size="small"
            color="primary"
            variant="dashed"
            className="mr-2"
            onClick={() => console.log(`to edit ds: ${record.title}`)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            variant="dashed"
            className="mr-2"
            onClick={() => console.log(`to delete ds: ${record.title}`)}
          >
            Delete
          </Button>
        </span>
      );
    },
  },
];

export const DSTable = ({ list }) => (
  <Table dataSource={list} columns={columns} />
);

import { Table } from 'antd';

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
];

export const DSTable = ({ list }) => (
  <Table dataSource={list} columns={columns} />
);

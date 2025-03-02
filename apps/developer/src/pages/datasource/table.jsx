import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    title: 'MySQL',
    driver: 'pymsql',
    host: '192.168.0.1',
    port: '3152',
    database: 'formas',
    instance: '',
    user: 'lwz',
    password: '123456',
  },
  {
    key: '2',
    title: 'MySQL',
    driver: 'pymsql',
    host: '192.168.0.1',
    port: '3152',
    database: 'formas',
    instance: '',
    user: 'lwz',
    password: '123456',
  },
  {
    key: '3',
    title: 'MySQL',
    driver: 'pymsql',
    host: '192.168.0.1',
    port: '3152',
    database: 'formas',
    instance: '',
    user: 'lwz',
    password: '123456',
  },
];

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

export const DSTable = () => (
  <Table dataSource={dataSource} columns={columns} />
);

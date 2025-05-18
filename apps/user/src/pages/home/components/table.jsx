import { Table } from 'antd';

const dumyDataSource = [
  {
    key: '1',
    name: 'select tree node from left side...',
  },
];

const dumyColumns = [
  {
    title: 'Next Step',
    dataIndex: 'name',
    key: 'name',
  },
];

export const ViewInstanceTable = ({ columns, rows }) => {
  if (!columns) {
    return <Table columns={dumyColumns} dataSource={dumyDataSource} />;
  }
  // make a copy of columns and reverse it to looks better
  const reOrderedColumns = [...columns].reverse();
  return <Table columns={reOrderedColumns} dataSource={rows} />;
};

import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'select tree node from left side...',
  },
];

const sampleColumns = [
  {
    title: 'Next Step',
    dataIndex: 'name',
    key: 'name',
  },
];

export const ViewInstanceTable = ({ columns, rows }) => {
  if (!columns) {
    return <Table dataSource={dataSource} columns={sampleColumns} />;
  }
  // make a copy of columns and reverse it to looks better
  const reOrderedColumns = [...columns].reverse();
  return <Table dataSource={rows} columns={reOrderedColumns} />;
};

import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'select tree node...',
  },
];

const sampleColumns = [
  {
    title: 'Next Step',
    dataIndex: 'name',
    key: 'name',
  },
];

export const ViewInstanceTable = ({ columns }) => {
  if (!columns) {
    return <Table dataSource={dataSource} columns={sampleColumns} />;
  }
  // console.log(columns);
  const reOrderedColumns = [...columns].reverse();
  // console.log('reOrderedColumns', reOrderedColumns);
  return <Table dataSource={dataSource} columns={reOrderedColumns} />;
};

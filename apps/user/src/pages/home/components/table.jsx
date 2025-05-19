import { Table, Space, Button } from 'antd';

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

/**
 * Dynamic table for form instance allow user to edit and delete
 * @param {*} columns
 * @param {*} rows form instance list
 * @param {function} openDataviewEditModal - open the edit modal
 * @param {function} openDataviewDeleteModal - open the delete modal
 * @returns
 */
export const ViewInstanceTable = ({
  columns,
  rows,
  openDataviewEditModal,
  openDataviewDeleteModal,
}) => {
  if (!columns) {
    return <Table columns={dumyColumns} dataSource={dumyDataSource} />;
  }
  // make a copy of columns and reverse it to looks better
  const reOrderedColumns = [...columns].reverse();
  const actionColumn = {
    title: 'Action',
    key: 'action',
    render: (_, formInstance) => (
      <Space size="middle">
        <Button
          type="primary"
          ghost
          onClick={() => openDataviewEditModal(formInstance)}
        >
          Edit
        </Button>
        <Button danger onClick={() => openDataviewDeleteModal(formInstance)}>
          Delete
        </Button>
      </Space>
    ),
  };
  // add action column
  reOrderedColumns.push(actionColumn);
  return <Table columns={reOrderedColumns} dataSource={rows} />;
};

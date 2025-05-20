// components/table.jsx
import { Table, Space, Button } from 'antd';

export const ViewInstanceTable = ({
  columns,
  rows,
  pagination,
  loading,
  onChange,
  openDataviewEditModal,
  openDataviewDeleteModal,
}) => {
  // 默认列（当没有列数据时显示）
  const defaultColumns = [
    {
      title: 'Next Step',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const defaultData = [
    {
      key: '1',
      name: 'select tree node from left side...',
    },
  ];

  if (!columns) {
    return (
      <Table
        columns={defaultColumns}
        dataSource={defaultData}
        pagination={false}
      />
    );
  }

  // 创建操作列
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

  // 复制列并添加操作列
  const tableColumns = [...columns, actionColumn];

  return (
    <Table
      columns={tableColumns}
      dataSource={rows}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
      onChange={onChange}
    />
  );
};

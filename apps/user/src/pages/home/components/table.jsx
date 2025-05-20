// components/table.jsx
import { Table, Space, Button } from 'antd';

export const ViewInstanceTable = ({
  columns,
  rows = [],
  pagination,
  loading,
  onChange,
  openDataviewEditModal,
  openDataviewDeleteModal,
}) => {
  // 创建操作列
  const actionColumn = {
    title: 'Action',
    key: 'action',
    fixed: 'right', // 固定在最右侧
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          ghost
          onClick={() => openDataviewEditModal(record)}
        >
          Edit
        </Button>
        <Button danger onClick={() => openDataviewDeleteModal(record)}>
          Delete
        </Button>
      </Space>
    ),
  };

  // 处理列显示逻辑
  const getTableColumns = () => {
    if (!columns) return [actionColumn]; // 如果没有列数据，只显示操作列

    return [
      // 过滤并处理原始列
      ...columns
        .filter(col => col.visible !== false)
        .map(col => ({ ...col })), // 浅拷贝避免修改原始数据
      // 添加操作列
      actionColumn
    ];
  };

  return (
    <Table
      columns={getTableColumns()}
      dataSource={rows}
      rowKey="id"
      loading={loading}
      pagination={
        pagination && {
          ...pagination,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          pageSizeOptions: ['10', '20', '50', '100'],
        }
      }
      onChange={onChange}
      locale={{
        emptyText: '请从左侧选择数据视图' // 自定义空数据提示
      }}
    />
  );
};

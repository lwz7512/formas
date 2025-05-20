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
  sorter, // 接收排序状态
}) => {
  // 创建操作列
  const actionColumn = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          ghost
          onClick={() => openDataviewEditModal(record)}
        >
          编辑
        </Button>
        <Button danger onClick={() => openDataviewDeleteModal(record)}>
          删除
        </Button>
      </Space>
    ),
  };

  // 处理列显示和排序配置
  const getTableColumns = () => {
    if (!columns) return [actionColumn];

    return [
      ...columns
        .filter(col => col.visible !== false)
        .map(col => {
          const columnDef = { ...col };
          
          // 如果配置了 sorter: true，则添加排序配置
          if (col.sorter) {
            columnDef.sorter = true;
            columnDef.sortOrder = sorter.field === col.dataIndex ? sorter.order : null;
          }
          
          return columnDef;
        }),
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
        emptyText: '请从左侧选择数据视图'
      }}
    />
  );
};

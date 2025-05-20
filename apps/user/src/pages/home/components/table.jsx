// components/table.jsx
import { Table, Space, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./style.css"

export const ViewInstanceTable = ({
  columns,
  rows = [],
  pagination,
  loading,
  onChange,
  openDataviewEditModal,
  openDataviewDeleteModal,
  sorter,
}) => {
  // 创建操作列 - 重构样式
  const actionColumn = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 120,
    render: (_, record) => (
      <Space size={0} className="action-buttons">
        <Tooltip title="编辑">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openDataviewEditModal(record)}
            className="action-btn edit-btn"
          />
        </Tooltip>
        <Tooltip title="删除">
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDataviewDeleteModal(record)}
            className="action-btn delete-btn"
          />
        </Tooltip>
      </Space>
    ),
  };

  // 处理列显示和排序配置
  const getTableColumns = () => {
    if (!columns) return [actionColumn];

    return [
      ...columns
        .filter(col => col.visible !== false)
        .map(col => ({
          ...col,
          ...(col.sorter && {
            sorter: true,
            sortOrder: sorter.field === col.dataIndex ? sorter.order : null,
          }),
          ellipsis: true, // 添加文本溢出省略号
        })),
      actionColumn,
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
        emptyText: '请从左侧选择数据视图',
      }}
      className="custom-table"
    />
  );
};

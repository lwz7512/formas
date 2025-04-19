import { Button, Table, Popconfirm, Tag } from 'antd';

export const DataSourceTable = ({
  data,
  loading,
  onEdit,
  onTest,
  onDelete,
  pagination = {},
  onPageChange,
}) => {
  // 处理行双击事件
  const handleRowDoubleClick = (record) => {
    if (onEdit) {
      onEdit(record);
    }
  };

  // 设置行属性
  const rowProps = (record) => {
    return {
      onDoubleClick: () => handleRowDoubleClick(record),
      style: { cursor: 'pointer' }, // 鼠标悬停时显示手型指针
    };
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'driver',
      key: 'driver',
      render: driver => <Tag color="blue">{driver}</Tag>,
    },
    {
      title: 'Connection',
      key: 'connection',
      render: (_, record) => (
        <span>
          {record.host}:{record.port}
        </span>
      ),
    },
    {
      title: 'Database',
      dataIndex: 'database',
      key: 'database',
      ellipsis: true,
    },
    {
      title: 'Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      align: 'center',
      render: isDefault => (
        <Tag color={isDefault ? 'green' : 'gray'}>
          {isDefault ? 'YES' : 'NO'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250,
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            size="small"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Button size="small" onClick={() => onTest(record.id)}>
            Test
          </Button>

          <Popconfirm
            title="Confirm Deletion"
            description="Are you sure to delete this data source?"
            onConfirm={() => onDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: (page, pageSize) => onPageChange(page, pageSize),
        onShowSizeChange: (current, size) => onPageChange(current, size),
      }}
      scroll={{ x: true }}
      size="middle"
      onRow={rowProps} // 添加行属性配置
    />
  );
};
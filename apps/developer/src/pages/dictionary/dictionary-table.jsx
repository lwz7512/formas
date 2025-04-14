import { Button, Table, Popconfirm, Tag } from 'antd';

export const DictionaryTable = ({
  data,
  loading,
  onEdit,
  onDelete,
  pagination = {},
  onPageChange,
}) => {
  const columns = [
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 150,
    },
    {
      title: '排序',
      dataIndex: 'sequence',
      key: 'sequence',
      align: 'center',
      width: 80,
      render: sequence => <Tag color="blue">{sequence}</Tag>,
    },
    {
      title: '显示名称',
      dataIndex: 'label',
      key: 'label',
      ellipsis: true,
      width: 150,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      width: 120,
    },
    {
      title: '操作',
      key: 'actions',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            size="small"
            onClick={() => onEdit(record)}
          >
            编辑
          </Button>
          
          <Popconfirm
            title="确认删除"
            description="确定要删除此字典项吗？"
            onConfirm={() => onDelete(record.id)}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger>
              删除
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
        onChange: onPageChange,
        onShowSizeChange: onPageChange,
      }}
      scroll={{ x: 800 }}
      size="middle"
      bordered={false}
    />
  );
};
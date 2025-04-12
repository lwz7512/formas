import { Button, Table, Popconfirm, Tag } from 'antd';

export const DataSourceTable = ({ 
  data, 
  loading,
  onEdit,      // 接收父组件传递的openModifyModal方法
  onTest,
  onDelete,
  pagination,
  onPageChange  // 新增分页回调
}) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: 'Type',
      dataIndex: 'driver',
      key: 'driver',
      render: (driver) => <Tag color="blue">{driver}</Tag>
    },
    {
      title: 'Connection',
      key: 'connection',
      render: (_, record) => (
        <span>
          {record.host}:{record.port}
        </span>
      )
    },
    {
      title: 'Database',
      dataIndex: 'database',
      key: 'database',
      ellipsis: true
    },
    {
      title: 'Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      align: 'center',
      render: (isDefault) => (
        <Tag color={isDefault ? 'green' : 'gray'}>
          {isDefault ? 'YES' : 'NO'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250,
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button 
            size="small"
            onClick={() => onEdit(record)}  // 这里传递整行数据
          >
            Edit
          </Button>
          
          <Button 
            size="small"
            onClick={() => onTest(record.id)}
          >
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
      )
    }
  ];

  return (
    <Table
      rowKey="id"
      bordered={true}
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: true }}
      size="middle"
      pagination={{
        ...pagination, // 确保展开所有分页属性
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  );
};
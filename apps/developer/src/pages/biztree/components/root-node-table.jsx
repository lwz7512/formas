// components/root-node-table.jsx
import { Button, Popconfirm, Table, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export const RootNodeTable = ({
  data = [],
  currentId = '',
  loading = false,
  onRowClick = () => {},
  onMenuClick = () => {},
  onChange = () => {}, // 处理分页/排序变化
}) => {
  const columns = [
    {
      title: '节点名称',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <Typography.Text
          ellipsis
          className={record.id === currentId ? 'text-blue-500 font-medium' : ''}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 70,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => onMenuClick('add', record.id, record)}
          />
          <Button
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onMenuClick('edit', record.id, record)}
          />
          <Popconfirm
            title="确认删除此节点？"
            description={`删除【${record.title}】吗？`}
            onConfirm={() => onMenuClick('delete', record.id)}
            okText="确认删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      onChange={onChange}
      onRow={record => ({
        onClick: () => onRowClick(record),
        className: record.id === currentId ? 'bg-blue-50' : 'cursor-pointer',
      })}
      size="middle"
      showHeader={false}
      bordered={false}
    />
  );
};

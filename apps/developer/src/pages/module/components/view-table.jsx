// components/view-table.jsx
import { Table, Button, Popconfirm, Space } from 'antd';
import { useView } from '../hooks/use-view';

export const ViewTable = ({ moduleId }) => {
  const { views, loading, handleDelete } = useView(moduleId);

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '关联表单',
      dataIndex: 'formId',
      key: 'formId',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Popconfirm
            title="确定要删除此视图吗?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={views}
      rowKey="key"
      bordered
      size="middle"
      loading={loading}
    />
  );
};
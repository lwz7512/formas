// components/view-table.jsx
import { useState } from 'react';
import { Table, Button, Popconfirm, Space } from 'antd';
import { useView } from '../hooks/use-view';
import { DataviewEditModel } from '../models/dataview-edit';

export const ViewTable = ({ moduleId }) => {
  const { views, loading, handleDelete, handleUpdate } = useView(moduleId);
  const [editingView, setEditingView] = useState(null);

  const handleEdit = (record) => {
    setEditingView(record);
  };

  const handleSave = async (values) => {
    try {
      await handleUpdate(editingView.id, values);
      setEditingView(null);
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '关联表单',
      dataIndex: 'formTitle',
      key: 'formTitle',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '操作',
      key: 'action',
      width: 120, // 设置固定宽度
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除此视图吗?"
            onConfirm={() => handleDelete(record.id)}
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
    <>
      <Table
        columns={columns}
        dataSource={views}
        rowKey="id"
        bordered={false}
        size="middle"
        loading={loading}
      />

      <DataviewEditModel
        visible={!!editingView}
        record={editingView}
        onSave={handleSave}
        onCancel={() => setEditingView(null)}
      />
    </>
  );
};

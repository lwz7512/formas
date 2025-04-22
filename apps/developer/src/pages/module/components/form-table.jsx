// components/form-table.jsx
import { useState } from 'react';
import { Table, Typography, Button, Popconfirm, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FORM_DEFINE_PATH } from '@/constants';
import { FormEditModal } from '../models/form-edit';

export const FormTable = ({ 
  forms, 
  loading, 
  onEdit, 
  onDelete, 
  onGenerateView 
}) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const navigate = useNavigate();

  // 打开表单设计器
  const openFormDesigner = (formId) => {
    navigate(`${FORM_DEFINE_PATH}/designer?formid=${formId}`);
  };

  // 打开编辑对话框
  const handleEdit = (record) => {
    setEditingRecord(record);
  };

  // 保存编辑
  const handleSave = async (values) => {
    try {
      await onEdit({ ...editingRecord, ...values });
      setEditingRecord(null);
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '序号',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link onClick={() => handleEdit(record)}>
            编辑
          </Typography.Link>
          <Button
            size="small"
            onClick={() => openFormDesigner(record.id)}
          >
            表单设计
          </Button>
          <Button
            size="small"
            onClick={() => onGenerateView(record.id)}
          >
            生成视图
          </Button>
          <Popconfirm
            title="确定要删除此表单吗?"
            onConfirm={() => onDelete(record.id)}
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
        dataSource={forms}
        rowKey="id"
        loading={loading}
        bordered={false}
        size="middle"
      />

      {/* 编辑对话框 */}
      <FormEditModal
        visible={!!editingRecord}
        record={editingRecord}
        onSave={handleSave}
        onCancel={() => setEditingRecord(null)}
      />
    </>
  );
};

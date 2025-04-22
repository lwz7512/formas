// components/form-table.jsx
import { useState } from 'react';
import { Form, Table, Typography, Button, Popconfirm, Space, Modal, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FORM_DEFINE_PATH } from '@/constants';

export const FormTable = ({ 
  forms, 
  loading, 
  onEdit, 
  onDelete, 
  onGenerateView 
}) => {
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // 打开表单设计器
  const openFormDesigner = (formId) => {
    navigate(`${FORM_DEFINE_PATH}/designer?formid=${formId}`);
  };

  // 打开编辑对话框
  const handleEdit = (record) => {
    form.setFieldsValue({
      sequence: record.sequence,
      title: record.title,
      note: record.note,
    });
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  // 保存编辑
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await onEdit({ ...editingRecord, ...values });
      setIsModalVisible(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('表单验证失败:', error);
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
      <Modal
        title="编辑表单"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingRecord(null);
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="sequence"
            label="序号"
            rules={[{ required: true, message: '请输入序号' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="title"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="note"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

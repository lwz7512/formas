// components/form-table.jsx
import { useState } from 'react';
import { Table, Typography, Button, Popconfirm, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FORM_DEFINE_PATH } from '@/constants';
import { FormEditModal } from '../modals/form-edit';
import { FormTemplateModal } from '../modals/form-template';
import { useFormTemplate } from '../hooks/use-form-template';

/**
 * Form tab content for module detail page
 * @date 2025-05-18
 */
export const FormTable = ({
  forms,
  loading,
  onEdit,
  onDelete,
  onGenerateView,
}) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const navigate = useNavigate();

  // 打开表单设计器
  const openFormDesigner = formId => {
    navigate(`${FORM_DEFINE_PATH}/designer?formid=${formId}`);
  };

  // 打开编辑对话框
  const handleEdit = record => {
    setEditingRecord(record);
  };

  // 保存编辑
  const handleSave = async values => {
    try {
      await onEdit({ ...editingRecord, ...values });
      setEditingRecord(null);
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const {
    currentForm,
    templateData,
    loading: formTemplateLoading,
    openModal: openFormTemplateModal,
    handleSaveTemplate,
    closeModal: closeFormTemplateModal,
  } = useFormTemplate();

  const handleSaveFormTemplate = async values => {
    const success = await handleSaveTemplate(currentForm, values);
    if (success) {
      closeFormTemplateModal();
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
      width: 300,
      render: (_, record) => (
        <Space size={8} wrap>
          {/* 1. 编辑 - 链接样式（次要操作） */}
          <Typography.Link
            onClick={() => handleEdit(record)}
            style={{ paddingRight: 8 }}
          >
            编辑
          </Typography.Link>

          {/* 2. 表单设计 - 主按钮样式（核心操作） */}
          <Button
            size="small"
            type="primary"
            ghost // 半透明效果，降低视觉重量
            onClick={() => openFormDesigner(record.id)}
          >
            设计
          </Button>

          {/* 3. 生成视图 - 默认按钮样式（重要操作） */}
          <Button size="small" onClick={() => onGenerateView(record.id)}>
            生成视图
          </Button>

          <Button
            size="small"
            type="primary"
            ghost // 半透明效果，降低视觉重量
            onClick={() => openFormTemplateModal(record.id)}
          >
            触发器
          </Button>

          {/* 4. 删除 - 危险链接样式（需警示） */}
          <Popconfirm
            title="确定要删除此表单吗?"
            onConfirm={() => onDelete(record.id)}
            okText="删除"
            cancelText="取消"
            placement="topRight"
          >
            <Typography.Link type="danger">删除</Typography.Link>
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
      {/* 表单触发器(数据视图DAO)模版 - 编辑 */}
      <FormTemplateModal
        visible={!!currentForm}
        record={templateData}
        onSave={handleSaveFormTemplate}
        onCancel={closeFormTemplateModal}
        loading={formTemplateLoading}
      />
    </>
  );
};

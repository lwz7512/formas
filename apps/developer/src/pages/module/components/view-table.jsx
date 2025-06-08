// components/view-table.jsx
import { useState } from 'react';
import { Table, Button, Popconfirm, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { DataviewEditModel } from '../modals/dataview-edit';
import { DataviewTemplateModal } from '../modals/dataview-template';
import { useDataviewTemplate } from '../hooks/use-dataview-template';
import ViewDesignerModal from '../modals/dataview-designer';
import { useDataviewColumn } from '../hooks/use-dataview-column';

/**
 * View tab content for module detail page
 * @date 2025-05-18
 */
export const ViewTable = ({
  moduleId,
  handleUpdate,
  handleDelete,
  views,
  loading,
  openCreatePresentation,
}) => {
  const [editingView, setEditingView] = useState(null);

  const handleViewEdit = record => {
    setEditingView(record);
  };

  const handleViewSave = async values => {
    try {
      await handleUpdate(editingView.id, values);
      setEditingView(null);
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  const {
    currentView,
    templateData,
    loading: dataviewTemplateLoading,
    openModal: openDataviewTemplateModal,
    handleSaveTemplate,
    closeModal: closeDataviewTemplateModal,
  } = useDataviewTemplate(moduleId);

  const handleSaveDataviewTemplate = async values => {
    const success = await handleSaveTemplate(currentView, values);
    if (success) {
      closeDataviewTemplateModal();
    }
  };

  // 使用设计器hooks
  const {
    designerVisible,
    loading: designerLoading,
    columnConfig,
    closeDesigner,
    handleSaveColumnConfig,
    previewData,
    loadPreviewData,
  } = useDataviewColumn();

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
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            onClick={() => handleViewEdit(record)}
            style={{ padding: '0 4px' }}
          >
            编辑
          </Button>
          <Button
            size="small"
            type="primary"
            ghost // 半透明效果，降低视觉重量
            onClick={() => openCreatePresentation(record.id)} // 添加点击事件
          >
            添加展示
          </Button>
          <Button
            size="small"
            onClick={() => openDataviewTemplateModal(record.id)}
          >
            自定义查询
          </Button>
          <Popconfirm
            title="确定要删除此视图吗?"
            onConfirm={() => handleDelete(record.id)}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="link"
              danger
              size="small"
              style={{ padding: '0 4px' }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 保存列配置的处理函数
  const onSaveColumnConfig = async (columns, selectedColumns) => {
    try {
      await handleSaveColumnConfig({ columns, selectedColumns });
      // closeDesigner();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

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
        onSave={handleViewSave}
        onCancel={() => setEditingView(null)}
      />

      <DataviewTemplateModal
        visible={!!currentView}
        record={templateData}
        onSave={handleSaveDataviewTemplate}
        onCancel={closeDataviewTemplateModal}
        loading={dataviewTemplateLoading}
      />

      <ViewDesignerModal
        visible={designerVisible}
        initialColumns={columnConfig?.columns}
        onSave={onSaveColumnConfig}
        onCancel={closeDesigner}
        viewId={editingView?.id}
        loading={designerLoading}
        previewData={previewData}
        onLoadPreviewData={loadPreviewData}
      />
    </>
  );
};

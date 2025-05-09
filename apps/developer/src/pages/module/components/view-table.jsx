// components/view-table.jsx
import { useState } from 'react';
import { Table, Button, Popconfirm, Space } from 'antd';
import { useView } from '../hooks/use-view';
import { DataviewEditModel } from '../modals/dataview-edit';
import { DataviewTemplateModal } from '../modals/dataview-template';
import { useDataviewTemplate } from '../hooks/use-dataview-template';
import ViewDesignerModal from '../modals/dataview-designer';

export const ViewTable = ({ moduleId }) => {
  const { views, loading, handleDelete, handleUpdate } = useView(moduleId);
  const [editingView, setEditingView] = useState(null);

  const handleEdit = record => {
    setEditingView(record);
  };

  const handleSave = async values => {
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
            onClick={() => handleEdit(record)}
            style={{ padding: '0 4px' }}
          >
            编辑
          </Button>
          <Button
            size="small"
            type="primary"
            ghost // 半透明效果，降低视觉重量
            onClick={() => openDesigner(record)}  // 添加点击事件
          >
            设计
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

  const [columnConfig, setColumnConfig] = useState({
    columns: [
      { dataIndex: 'id', title: 'ID', type: 'text', visible: true, width: 100 },
      { dataIndex: 'name', title: '姓名', type: 'text', visible: true },
      { dataIndex: 'age', title: '年龄', type: 'number', visible: true },
      { dataIndex: 'gender', title: '性别', type: 'text', visible: false },
      { dataIndex: 'email', title: '邮箱', type: 'text', visible: true },
    ],
    selectedColumns: [],
  });

  // 添加状态控制设计器对话框
  const [designerVisible, setDesignerVisible] = useState(false);
  const [currentDesignView, setCurrentDesignView] = useState(null);

  // 打开设计器的方法
  const openDesigner = (view) => {
    setCurrentDesignView(view);
    setDesignerVisible(true);
    
    // 这里可以根据view.id加载特定的列配置
    // 例如: const config = await loadViewConfig(view.id);
    // setColumnConfig(config);
  };

  // 关闭设计器的方法
  const closeDesigner = () => {
    setDesignerVisible(false);
    setCurrentDesignView(null);
  };

  // 保存列配置的处理函数
  const handleSaveColumnConfig = async (columns, selectedColumns) => {
    try {
      // 这里可以添加保存到后端逻辑
      // await saveViewConfig(currentDesignView.id, { columns, selectedColumns });
      
      setColumnConfig({ columns, selectedColumns });
      console.log('保存的列配置:', columns);
      console.log('选中的列:', selectedColumns);
      message.success('视图配置保存成功');
      closeDesigner();
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存视图配置失败');
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
        onSave={handleSave}
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
        initialColumns={columnConfig.columns}
        onSave={handleSaveColumnConfig}
        onCancel={closeDesigner}
        viewId={currentDesignView?.id}
      />
    </>
  );
};

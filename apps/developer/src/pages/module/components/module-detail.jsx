// components/module-detail.jsx
import { useState } from 'react';
import { Button, Empty, Space, Tabs, Typography } from 'antd';
import { PlusOutlined, ProfileOutlined, TableOutlined } from '@ant-design/icons';
import { useView } from '../hooks/use-view';
import { useForm } from '../hooks/use-form';
import { ViewTable } from './view-table';
import { FormTable } from './form-table';
import { FormCreateModel } from '../models/form-create';

export const ModuleDetailPanel = ({ selectedModule }) => {
  const [activeTab, setActiveTab] = useState('forms');
  
  // 视图相关逻辑
  const view = useView(selectedModule?.id);
  
  // 表单相关逻辑
  const {
    forms,
    loading,
    editingKey,
    isModalOpen,
    setEditingKey,
    setIsModalOpen,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleGenerateView
  } = useForm(selectedModule?.id);

  // 编辑表单
  const handleEdit = async (updatedForm) => {
    try {
      await handleUpdate(updatedForm.id, updatedForm);
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  // 保存表单
  const handleSave = async (key) => {
    try {
      await handleUpdate(key);
      setEditingKey('');
    } catch (errInfo) {
      console.log('保存失败:', errInfo);
    }
  };

  // 取消编辑
  const handleCancel = () => {
    setEditingKey('');
  };

  if (!selectedModule) {
    return (
      <div className="module-detail-panel">
        <Typography.Title level={4} style={{ marginBottom: 16 }}>
          模块详情
        </Typography.Title>
        <Empty description="请从左侧选择模块" />
      </div>
    );
  }

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => setIsModalOpen(true)}
          >
            {activeTab === 'forms' ? '新建表单' : '新建视图'}
          </Button>
        }
        items={[
          {
            key: 'forms',
            label: (
              <Space>
                <ProfileOutlined />
                表单
              </Space>
            ),
            children: (
              <FormTable
                forms={forms}
                loading={loading}
                editingKey={editingKey}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
                onGenerateView={handleGenerateView}
              />
            ),
          },
          {
            key: 'views',
            label: (
              <Space>
                <TableOutlined />
                视图
              </Space>
            ),
            children: <ViewTable moduleId={selectedModule?.id} />,
          },
        ]}
      />
      
      <FormCreateModel
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        moduleId={selectedModule?.id}
      />
    </>
  );
};

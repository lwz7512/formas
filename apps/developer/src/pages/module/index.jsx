// index.jsx
import { useState } from 'react';
import { App, Card, Col, Row, Space, Typography } from 'antd';
import { useModuleTree } from './hooks/use-module-tree';
import { ModuleCreateModel } from './models/module-create';
import { ModuleTree } from './components/module-tree';
import { ROOT_BIZ_TREE_ID } from '@/config';

export const ModuleManagement = () => {
  const { message } = App.useApp();
  const {
    modules,
    isLoading,
    createModule,
    updateModule,
    deleteModule,
    refreshModules,
    selectedModule,
    setSelectedModule,
  } = useModuleTree();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateModule = async (values, parentId = ROOT_BIZ_TREE_ID) => {
    try {
      await createModule(values, parentId);
      message.success(parentId ? '子模块添加成功' : '模块创建成功');
      return true;
    } catch (error) {
      message.error(parentId ? '子模块添加失败' : '模块创建失败');
      return false;
    }
  };

  const handleDeleteModule = async (moduleId) => {
    try {
      await deleteModule(moduleId);
      message.success('删除成功');
      if (selectedModule?.id === moduleId) {
        setSelectedModule(null);
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleUpdateModule = async (module, values) => {
    try {
      await updateModule(module.id, values);
      message.success('模块更新成功');
      return true;
    } catch (error) {
      message.error('模块更新失败');
      return false;
    }
  };

  const handleSelectModule = (selectedKeys, { node }) => {
    setSelectedModule(node);
  };

  return (
    <div className="module-management">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <ModuleTree
            modules={modules}
            isLoading={isLoading}
            selectedModule={selectedModule}
            onSelectModule={handleSelectModule}
            onCreateModule={handleCreateModule}
            onUpdateModule={handleUpdateModule}
            onDeleteModule={handleDeleteModule}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={16} xl={18}>
          <ModuleDetailPanel selectedModule={selectedModule} />
        </Col>
      </Row>

      <ModuleCreateModel
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateModule}
        parentModule={selectedModule}
      />
    </div>
  );
};

const ModuleDetailPanel = ({ selectedModule }) => (
  <Card
    title={
      <Space align="center">
        <Typography.Text strong>模块详情</Typography.Text>
        {selectedModule && (
          <Typography.Text type="secondary">
            (当前模块: {selectedModule.title})
          </Typography.Text>
        )}
      </Space>
    }
  >
    {selectedModule ? (
      <div>模块详情内容</div>
    ) : (
      <div>请从左侧选择模块</div>
    )}
  </Card>
);

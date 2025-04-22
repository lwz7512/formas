// index.jsx
import { useState } from 'react';
import { App, Card, Col, Row, Space, Typography, message } from 'antd';
import { useModuleTree } from './hooks/use-module-tree';
import { CreateModuleModal } from './models/create-module';
import { ROOT_BIZ_TREE_ID } from '@/config';
import { ModuleTree } from './components/module-tree';

export const ModuleDevelopmentConsole = () => {
  const { message } = App.useApp();
  const {
    treeData,
    loading,
    addModule,
    handleDeleteModule, // 假设你的useModuleTree hook中有这个方法
    handleUpdateModule,
  } = useModuleTree();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleAddModule = async (values, parentId = ROOT_BIZ_TREE_ID) => {
    try {
      await addModule(values, parentId);
      message.success(parentId ? '子模块添加成功' : '模块创建成功');
    } catch (error) {
      console.error('创建失败', error);
      message.error(parentId ? '子模块添加失败' : '模块创建失败');
      throw error; // 抛出错误让对话框保持打开
    }
  };

  const onDeleteModule = async id => {
    try {
      await handleDeleteModule(id);
      message.success('删除成功');
      // 如果删除的是当前选中的节点，清空选中状态
      if (selectedModule && selectedModule.id === id) {
        setSelectedModule(null);
      }
    } catch (error) {
      console.error('删除失败', error);
      message.error('删除失败');
    }
  };

  const onSelectModule = (selectedKeys, { node }) => {
    setSelectedModule(node);
  };

  const handleEditModule = async (module, values) => {
    try {
      await handleUpdateModule(module.id, values);
      message.success('模块更新成功');
    } catch (error) {
      console.error('更新失败', error);
      message.error('模块更新失败');
      throw error; // 抛出错误让对话框保持打开
    }
  };

  return (
    <div className="module-development-console">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
        <ModuleTree
            treeData={treeData}
            loading={loading}
            selectedModule={selectedModule}
            onSelectModule={onSelectModule}
            onAddModule={handleAddModule}
            onEditModule={handleEditModule}
            onDeleteModule={onDeleteModule}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={16} xl={18}>
          <Card
            title={
              <Space align="center">
                <Typography.Text strong>子节点管理</Typography.Text>
                {selectedModule && (
                  <Typography.Text type="secondary">
                    (当前模块: {selectedModule.title})
                  </Typography.Text>
                )}
              </Space>
            }
          >
            {/* 内容区域 */}
          </Card>
        </Col>
      </Row>

      <CreateModuleModal
        visible={isModalVisible}
        onOk={handleAddModule}
        onClose={() => setIsModalVisible(false)}
        parentModule={selectedModule}
        loading={false}
      />
    </div>
  );
};

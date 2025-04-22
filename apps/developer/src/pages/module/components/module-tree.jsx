// components/module-tree.jsx
import { useState } from 'react';
import { Button, Card, Empty, Popconfirm, Space, Tree, Typography } from 'antd';
import { 
  AppstoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons';
import { EditModuleModal } from '../models/edit-module';
import { CreateModuleModal } from '../models/create-module';

export const ModuleTree = ({
  treeData = [],
  loading = false,
  selectedModule,
  onSelectModule,
  onAddModule,
  onEditModule,
  onDeleteModule,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditModule, setCurrentEditModule] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentParentModule, setCurrentParentModule] = useState(null);

  const renderTreeNodeTitle = (nodeData) => {
    return (
      <div className="flex items-center justify-between w-full group">
        <span className="truncate flex-1">
          {nodeData.title}
        </span>
        <div className="tree-node-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            type="text"
            size="small"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentParentModule(nodeData);
              setAddModalVisible(true);
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentEditModule(nodeData);
              setEditModalVisible(true);
            }}
          />
          <Popconfirm
            title={`确认删除【${nodeData.title}】模块？`}
            description="删除后无法恢复，请谨慎操作"
            onConfirm={() => onDeleteModule?.(nodeData)}
            okText="确认删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              danger
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </div>
      </div>
    );
  };

  const handleAddModule = async (values) => {
    try {
      await onAddModule?.(values, currentParentModule?.id);
      setAddModalVisible(false);
    } catch (error) {
      console.error('添加子模块失败:', error);
    }
  };

  const handleEditModule = async (values) => {
    try {
      await onEditModule?.(currentEditModule, values);
      setEditModalVisible(false);
    } catch (error) {
      console.error('编辑失败:', error);
    }
  };

  if (treeData.length === 0 && !loading) {
    return (
      <Card
        title={
          <Space align="center">
            <AppstoreOutlined />
            <Typography.Text strong>模块</Typography.Text>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentParentModule(null);
              setAddModalVisible(true);
            }}
            loading={loading}
          >
            新增模块
          </Button>
        }
      >
        <div className="flex items-center justify-center h-full">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无模块数据"
            imageStyle={{ height: 60 }}
          />
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card
        title={
          <Space align="center">
            <AppstoreOutlined />
            <Typography.Text strong>模块</Typography.Text>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentParentModule(null);
              setAddModalVisible(true);
            }}
            loading={loading}
          >
            新增模块
          </Button>
        }
        loading={loading}
      >
        <Tree
          blockNode
          treeData={treeData}
          titleRender={renderTreeNodeTitle}
          selectedKeys={selectedModule ? [selectedModule.key] : []}
          onSelect={onSelectModule}
          expandAction="click"
          selectable
          showIcon={false}
          showLine={{
            showLeafIcon: (
              <DeploymentUnitOutlined style={{ 
                color: '#1890ff', 
                fontSize: 14,
                marginRight: 8 
              }} />
            ),
          }}
          fieldNames={{ title: 'title', key: 'id' }}
        />
      </Card>

      {/* 编辑模块对话框 */}
      <EditModuleModal
        visible={editModalVisible}
        onOk={handleEditModule}
        onClose={() => setEditModalVisible(false)}
        moduleData={currentEditModule}
        loading={loading}
      />

      {/* 复用创建模块对话框 */}
      <CreateModuleModal
        visible={addModalVisible}
        onOk={handleAddModule}
        onClose={() => setAddModalVisible(false)}
        parentModule={currentParentModule}
        loading={loading}
      />
    </>
  );
};
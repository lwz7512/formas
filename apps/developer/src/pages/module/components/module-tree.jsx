// components/module-tree.jsx
import { useState } from 'react';
import { Button, Card, Empty, Popconfirm, Tree, Typography } from 'antd';
import { 
  AppstoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons';
import { ModuleCreateModel } from '../models/module-create';
import { ModuleEditModal } from '../models/module-edit';

export const ModuleTree = ({
  modules = [],
  isLoading = false,
  selectedModule,
  expandedKeys = [],  // 接收 expandedKeys 属性
  onSelectModule,
  onExpand,  // 接收 onExpand 回调
  onCreateModule,
  onUpdateModule,
  onDeleteModule,
  onOpenCreateModal,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [parentModule, setParentModule] = useState(null);

  const renderModuleActions = (module) => (
    <div className="module-actions opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        type="text"
        size="small"
        icon={<PlusOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          setParentModule(module);
          setIsCreateModalOpen(true);
        }}
        aria-label="添加子模块"
      />
      <Button
        type="text"
        size="small"
        icon={<EditOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          setEditingModule(module);
          setIsEditModalOpen(true);
        }}
        aria-label="编辑模块"
      />
      <Popconfirm
        title={`确认删除【${module.title}】模块？`}
        description="删除后无法恢复，请谨慎操作"
        onConfirm={() => onDeleteModule(module.id)}
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
          aria-label="删除模块"
        />
      </Popconfirm>
    </div>
  );

  const renderModuleTitle = (module) => (
    <div className="flex items-center justify-between w-full group">
      <span className="truncate flex-1">{module.title}</span>
      {renderModuleActions(module)}
    </div>
  );

  const processModuleTree = (nodes) => 
    nodes.map(node => ({
      ...node,
      title: renderModuleTitle(node),
      children: node.children ? processModuleTree(node.children) : undefined,
    }));

  const handleCreateSubmit = async (values) => {
    const success = await onCreateModule(values, parentModule?.id);
    if (success) setIsCreateModalOpen(false);
  };

  const handleUpdateSubmit = async (values) => {
    const success = await onUpdateModule(editingModule, values);
    if (success) setIsEditModalOpen(false);
  };

  if (modules.length === 0 && !isLoading) {
    return (
      <ModuleTreeEmptyState 
        onAddModule={onOpenCreateModal} 
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <Card
        title={<ModuleTreeTitle />}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onOpenCreateModal}
            loading={isLoading}
            aria-label="添加根模块"
          >
            新增模块
          </Button>
        }
        loading={isLoading}
      >
        <Tree
          blockNode
          treeData={processModuleTree(modules)}
          selectedKeys={selectedModule ? [selectedModule.id] : []}  // 使用 id 而非 key
          expandedKeys={expandedKeys}  // 传递 expandedKeys
          onExpand={onExpand}  // 传递 onExpand 回调
          onSelect={onSelectModule}
          expandAction="click"
          selectable
          showIcon={false}
          showLine={{
            showLeafIcon: (
              <DeploymentUnitOutlined className="text-blue-500 text-sm mr-2" />
            ),
          }}
          fieldNames={{ title: 'title', key: 'id' }}  // 确保 key 使用 id
        />
      </Card>

      <ModuleEditModal
        open={isEditModalOpen}
        module={editingModule}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateSubmit}
      />

      <ModuleCreateModel
        open={isCreateModalOpen}
        parentModule={parentModule}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />
    </>
  );
};

// ... ModuleTreeTitle 和 ModuleTreeEmptyState 保持不变 ...

const ModuleTreeTitle = () => (
  <div className="flex items-center">
    <AppstoreOutlined className="mr-2" />
    <span className="font-semibold">模块列表</span>
  </div>
);

const ModuleTreeEmptyState = ({ onAddModule, isLoading }) => (
  <Card
    title={<ModuleTreeTitle />}
    extra={
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onAddModule}
        loading={isLoading}
      >
        新增模块
      </Button>
    }
  >
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="暂无模块数据"
      imageStyle={{ height: 60 }}
    />
  </Card>
);

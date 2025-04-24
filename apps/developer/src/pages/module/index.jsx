// index.jsx
import { useEffect, useState, useMemo } from 'react';
import { App, Col, Row } from 'antd';

import { useModuleTree } from './hooks/use-module-tree';

import { ModuleCreateModel } from './models/module-create';
import { ModuleTree } from './components/module-tree';
import { ModuleDetailPanel } from './components/module-detail';
import { ROOT_BIZ_TREE_ID } from '@/config';

// == NO NEED TO PUT IT IN HOOKS, OR PRODUCE UNNECESSARY RERENDERS INSIDE HOOKS ==
// 辅助函数：根据ID查找模块
const findModuleById = (id, treeData) => {
  for (const node of treeData) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findModuleById(id, node.children);
      if (found) return found;
    }
  }
  return null;
};

// == NO NEED TO PUT IT IN HOOKS, OR PRODUCE UNNECESSARY RERENDERS INSIDE HOOKS ==
// 获取一个节点的所有父级key（递归实现）
const getParentKeys = (targetId, treeData, keys = []) => {
  for (const node of treeData) {
    if (node.id === targetId) return keys;
    if (node.children) {
      const found = getParentKeys(targetId, node.children, [...keys, node.id]);
      if (found) return found;
    }
  }
  return null;
};

export const ModuleManagement = () => {
  const { message } = App.useApp();
  const {
    modules,
    isLoading,
    createModule,
    updateModule,
    deleteModule,
    selectedModule,
    setSelectedModule,
  } = useModuleTree();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // 新增状态：存储展开的节点keys
  const [expandedKeys, setExpandedKeys] = useState([]);

  // 更新选中状态时，存储到 localStorage
  const handleSelectModule = (selectedKeys, { node }) => {
    console.log('Selected node:', node); // 验证节点数据结构
    setSelectedModule(node);
    try {
      localStorage.setItem('lastSelectedModuleId', node.id);
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  };

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

  const handleDeleteModule = async moduleId => {
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

  // 从 localStorage 读取，并处理可能的无效值
  // const [initialSelectedModuleId, setInitialSelectedModuleId] = useState(() => {
  //   try {
  //     return localStorage.getItem('lastSelectedModuleId') || null;
  //   } catch (e) {
  //     console.warn('Failed to read localStorage:', e);
  //     return null;
  //   }
  // });
  // more react & efficient way:
  // 使用 useMemo 包装，避免重复读取 localStorage
  // @date 2025-04-23
  const initialSelectedModuleId = useMemo(() => {
    try {
      return localStorage.getItem('lastSelectedModuleId') || null;
    } catch (e) {
      console.warn('Failed to read localStorage:', e);
      return null;
    }
  }, []);

  // 初始化选中状态（组件加载时）
  useEffect(() => {
    if (initialSelectedModuleId && modules.length > 0) {
      const lastSelectedModule = findModuleById(
        initialSelectedModuleId,
        modules
      );

      if (lastSelectedModule) {
        setSelectedModule(lastSelectedModule);
        const parentKeys = getParentKeys(lastSelectedModule.id, modules);
        console.log('Parent keys to expand:', parentKeys);
        setExpandedKeys(parentKeys || []);
      }
    }
  }, [modules, initialSelectedModuleId, setSelectedModule]);

  return (
    <div className="module-management">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <ModuleTree
            modules={modules}
            isLoading={isLoading}
            selectedModule={selectedModule}
            expandedKeys={expandedKeys} // 传递展开状态
            onExpand={setExpandedKeys} // 处理手动展开/折叠
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

// src/hooks/use-module-tree.js
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { fetchModuleTree, createModule, updateModule, deleteModule } from '@/api/modules';

export const useModuleTree = () => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  // 获取模块树数据
  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetchModuleTree();
      setTreeData(response.datas);
    } catch (error) {
      message.error('获取模块树失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 新增模块
  const addModule = async (moduleData, parentId) => {
    try {
      moduleData.pid = parentId;
      const newModule = await createModule({
        ...moduleData
      });
      await fetchModules();
      return newModule;
    } catch (error) {
      message.error('新增模块失败');
      throw error;
    }
  };

  // 更新模块
  const handleUpdateModule = async (id, moduleData) => {
    try {
      await updateModule(id, moduleData);
      await fetchModules();
    } catch (error) {
      message.error('更新模块失败');
      throw error;
    }
  };

  // 删除模块
  const handleDeleteModule = async (node) => {
    try {
      await deleteModule(node.id);
      await fetchModules();
      message.success('删除成功');
    } catch (error) {
      message.error('删除模块失败');
      throw error;
    }
  };

  // 初始化加载数据
  useEffect(() => {
    fetchModules();
  }, []);

  return {
    treeData,
    loading,
    selectedModule,
    setSelectedModule,
    fetchModules,
    addModule,
    handleUpdateModule,
    handleDeleteModule
  };
};

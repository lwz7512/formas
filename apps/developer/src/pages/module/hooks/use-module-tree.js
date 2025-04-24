// hooks/use-module-tree.js
import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import {
  fetchModuleTree,
  createModule as apiCreateModule,
  updateModule as apiUpdateModule,
  deleteModule as apiDeleteModule,
} from '@/api/modules';

export const useModuleTree = () => {
  const [state, setState] = useState({
    modules: [],
    isLoading: false,
    selectedModule: null,
  });

  const fetchModules = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetchModuleTree();
      setState(prev => ({ ...prev, modules: response.datas }));
    } catch (error) {
      message.error('获取模块树失败');
      console.error('Fetch modules error:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const createModule = async (moduleData, parentId) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await apiCreateModule({ ...moduleData, pid: parentId });
      await fetchModules();
    } catch (error) {
      console.error('Create module error:', error);
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateModule = async (moduleId, moduleData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await apiUpdateModule(moduleId, moduleData);
      await fetchModules();
    } catch (error) {
      console.error('Update module error:', error);
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const deleteModule = async moduleId => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await apiDeleteModule(moduleId);
      await fetchModules();
    } catch (error) {
      console.error('Delete module error:', error);
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * 使用 useCallback 包装 setSelectedModule to keep the same reference!
   * 否则，selectedModule 的引用会发生变化，导致组件重新渲染
   * @date 2025-04-23
   */
  const setSelectedModule = useCallback(module => {
    setState(prev => ({ ...prev, selectedModule: module }));
  }, []);

  useEffect(() => {
    fetchModules();
  }, []);

  return {
    ...state,
    refreshModules: fetchModules,
    createModule,
    updateModule,
    deleteModule,
    setSelectedModule,
  };
};

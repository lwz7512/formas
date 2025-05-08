// hooks/use-dataview-template.js
import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  fetchDataviewTemplate,
  updateDataviewTemplate,
} from '@/api/dataview-template';

export const useDataviewTemplate = moduleId => {
  const [currentView, setCurrentView] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 获取模板数据
  const fetchTemplate = useCallback(
    async viewId => {
      try {
        setLoading(true);
        // 调用现有API获取模板
        const response = await fetchDataviewTemplate(viewId);
        setTemplateData(response.data);
        return response.data;
      } catch (error) {
        message.error(
          `获取模板失败: ${error.response?.data?.message || error.message}`
        );
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [moduleId]
  );

  // 保存模板
  const handleSaveTemplate = useCallback(
    async (viewId, values) => {
      try {
        setLoading(true);
        // 调用现有API保存模板
        const response = await updateDataviewTemplate(viewId, values);
        message.success(response.data.message || '模板保存成功');
        return response.data;
      } catch (error) {
        message.error(
          `保存失败: ${error.response?.data?.message || error.message}`
        );
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [moduleId]
  );

  // 打开模态框并自动加载数据
  const openModal = useCallback(
    async viewId => {
      setCurrentView(viewId);
      if (viewId) {
        try {
          await fetchTemplate(viewId);
        } catch {
          // 错误已在fetchTemplate中处理
        }
      }
    },
    [fetchTemplate]
  );

  return {
    currentView,
    templateData,
    loading,
    openModal,
    fetchTemplate,
    handleSaveTemplate,
    closeModal: () => {
      setCurrentView(null);
      setTemplateData(null);
    },
  };
};

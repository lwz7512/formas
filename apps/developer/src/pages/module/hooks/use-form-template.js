// hooks/use-dataview-template.js
import { useState, useCallback } from 'react';
import { message } from 'antd';
import { fetchFormTemplate, updateFormTemplate } from '@/api/form-template';

/**
 * 表单触发器(数据视图DAO)模版 - 管理
 * @returns
 */
export const useFormTemplate = () => {
  const [currentForm, setCurrentForm] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 获取模板数据
  const fetchTemplate = useCallback(async formId => {
    try {
      setLoading(true);
      // 调用现有API获取模板
      const response = await fetchFormTemplate(formId);
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
  }, []);

  // 保存模板
  const handleSaveTemplate = useCallback(async (formId, values) => {
    try {
      setLoading(true);
      // 调用现有API保存模板
      const response = await updateFormTemplate(formId, values);
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
  }, []);

  // 打开模态框并自动加载数据
  const openModal = useCallback(
    async formId => {
      setCurrentForm(formId);
      if (formId) {
        try {
          await fetchTemplate(formId);
        } catch {
          // 错误已在fetchTemplate中处理
        }
      }
    },
    [fetchTemplate]
  );

  return {
    currentForm,
    templateData,
    loading,
    openModal,
    fetchTemplate,
    handleSaveTemplate,
    closeModal: () => {
      setCurrentForm(null);
      setTemplateData(null);
    },
  };
};

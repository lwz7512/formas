// hooks/use-dataview-template.js
import { useState } from 'react';
import { message } from 'antd';

export const useDataviewTemplate = (moduleId) => {
  const [currentView, setCurrentView] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSaveTemplate = async (viewId, values) => {
    try {
      setLoading(true);
      // 这里替换为实际的API调用
      // const response = await api.saveCustomQuery(moduleId, viewId, values);
      message.success('自定义查询保存成功');
      return true;
    } catch (error) {
      message.error('保存失败: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    currentView,
    loading,
    openModal: setCurrentView,
    handleSaveTemplate,
    closeModal: () => setCurrentView(null),
  };
};

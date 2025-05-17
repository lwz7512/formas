// hooks/use-dataview-column.js
import { useCallback, useState } from 'react';
import { message } from 'antd';
import { fetchDataview, updateDataviewColumnConfig } from '@/api/dataview';
import { fetchDataviewInstanceList } from '@/api/dataview-instance';

export const useDataviewColumn = () => {
  const [currentViewId, setCurrentViewId] = useState(null); // 新增状态管理当前视图ID
  const [loading, setLoading] = useState(false);
  const [designerVisible, setDesignerVisible] = useState(false);
  const [columnConfig, setColumnConfig] = useState({
    columns: [],
    selectedColumns: [],
  });
  const [previewData, setPreviewData] = useState([]);

  // 获取列配置信息
  const loadPreviewData = useCallback(
    async previewData => {
      try {
        if (!currentViewId) return;
        setLoading(true);
        const response = await fetchDataviewInstanceList(currentViewId);
        setPreviewData(response.datas);
        return response.datas;
      } finally {
        setLoading(false);
      }
    }
  );

  // 获取列配置信息
  const loadColumnConfig = useCallback(
    async currentViewId => {
      try {
        setLoading(true);
        const response = await fetchDataview(currentViewId);

        // 确保正确处理响应数据
        const config = response.data?.columnConfig || {
          columns: response.data?.columns || [], // 默认列
          selectedColumns: response.data?.selectedColumns || [],
        };

        setColumnConfig(config);
        return config;
      } catch (error) {
        console.error('加载列配置失败:', error);
        // 返回默认配置
        const defaultConfig = {
          columns: [
            {
              dataIndex: 'id',
              title: 'ID',
              type: 'text',
              visible: true,
              width: 100,
            },
            // 其他默认列...
          ],
          selectedColumns: [],
        };
        setColumnConfig(defaultConfig);
        return defaultConfig;
      } finally {
        setLoading(false);
      }
    },
    [currentViewId]
  );

  // 保存视图列设计配置
  const handleSaveColumnConfig = useCallback(
    async config => {
      if (!currentViewId) return;
      const response = await updateDataviewColumnConfig(currentViewId, config);
      message.success(response.errMsg || '列配置保存成功');
    },
    [currentViewId]
  );

  // 打开设计器并加载配置
  const openDesigner = useCallback(
    async view => {
      setCurrentViewId(view.id); // 存储当前视图ID
      setDesignerVisible(true);
      await loadColumnConfig(view.id); // 使用视图ID加载配置
    },
    [loadColumnConfig]
  );

  // 关闭设计器
  const closeDesigner = () => {
    setDesignerVisible(false);
  };

  return {
    designerVisible,
    loading,
    columnConfig, // 确保包含columns和selectedColumns
    openDesigner,
    closeDesigner,
    handleSaveColumnConfig,
    previewData,
    loadPreviewData,
  };
};

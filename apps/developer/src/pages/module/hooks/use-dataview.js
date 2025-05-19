// hooks/use-view.js
import { useState, useEffect } from 'react';
import { notification } from 'antd';
import {
  fetchDataviewList,
  deleteDataview,
  updateDataview,
} from '@/api/dataview';

export const useView = (moduleId, toast) => {
  const [loading, setLoading] = useState(false);
  const [views, setViews] = useState([]);

  // 获取视图列表
  const fetchViews = async id => {
    try {
      setLoading(true);
      const response = await fetchDataviewList(id);
      setViews(response.datas || []);
      return response.datas;
    } catch (error) {
      notification.error({ message: '加载视图失败' });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // 删除视图
  const handleDelete = async viewId => {
    try {
      setLoading(true);
      await deleteDataview(viewId);
      await fetchViews(moduleId);
      notification.success({ message: '视图删除成功' });
      return true;
    } catch (error) {
      notification.error({ message: '删除视图失败' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 修改视图
  const handleUpdate = async (viewId, values) => {
    try {
      setLoading(true);
      await updateDataview(viewId, values); // 假设有updateView API函数
      await fetchViews(moduleId);
      notification.success({ message: '视图更新成功' });
      return true;
    } catch (error) {
      notification.error({ message: '更新视图失败' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshViews = async () => {
    await fetchViews(moduleId);
    toast.success('视图刷新成功');
  };

  // 初始化加载数据
  useEffect(() => {
    if (moduleId) {
      fetchViews(moduleId);
    }
  }, [moduleId]);

  return {
    views,
    loading,
    handleDelete,
    handleUpdate,
    refreshViews,
  };
};

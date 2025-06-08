/**
 * 数据呈现 相关逻辑
 * @date 2025-06-08
 */

import { useState, useEffect } from 'react';
import { notification } from 'antd';
import {
  fetchPresentationList,
  createPresentation,
  updatePresentation,
  deletePresentation,
} from '@/api/presentation';

/**
 * Presentation list operation hook
 * @param {*} moduleId
 * @returns
 */
export const usePresentation = (moduleId, toast, switchTab) => {
  const [loading, setLoading] = useState(false);
  const [presentations, setPresentations] = useState([]);
  const [dataViewId, setDataViewId] = useState(null);

  const [isCreatePresentationOpen, setIsCreatePresentationOpen] =
    useState(false);

  const openCreatePresentation = viewId => {
    setDataViewId(viewId);
    setIsCreatePresentationOpen(true);
  };

  const closeCreatePresentation = () => {
    setIsCreatePresentationOpen(false);
  };

  const refreshPresentations = () => {
    fetchPresentationList(moduleId).then(res => {
      // ! get `datas` from response!
      setPresentations(res.datas);
      toast.success('刷新呈现成功');
    });
  };

  const handleCreatePresentation = async values => {
    // console.log(values);
    try {
      setLoading(true);
      const payload = {
        ...values,
        moduleId,
        // ! `dataviewId` is required by backend!
        dataviewId: dataViewId,
      };
      await createPresentation(payload);
      switchTab('presentation');
      refreshPresentations();
      return true;
    } catch (error) {
      notification.error({ message: '创建呈现失败' });
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!moduleId) return;

    fetchPresentationList(moduleId).then(res => {
      setPresentations(res.datas);
      setLoading(false);
    });
    setLoading(true);
  }, [moduleId]);

  return {
    loading,
    presentations,
    isCreatePresentationOpen,
    openCreatePresentation,
    closeCreatePresentation,
    handleCreatePresentation,
    refreshPresentations,
  };
};

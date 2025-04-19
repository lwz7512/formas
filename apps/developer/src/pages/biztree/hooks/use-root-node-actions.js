// hooks/use-root-node-actions.js
import { App } from 'antd';
import { useState } from 'react';
import { deleteRootNode } from '@/api/biztree';

export const useRootNodeActions = (refresh) => {
  const { notification } = App.useApp();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteRootNode(id);
      notification.success({ message: '删除根节点成功' });
      refresh();
      return true;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    handleDelete,
    isDeleting: (id) => deletingId === id, // 可用于显示行级加载状态
  };
};

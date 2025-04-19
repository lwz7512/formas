// hooks/use-child-node-actions.js
import { useState } from 'react';
import { deleteChildNode } from '@/api/biztree';

export const useChildNodeActions = (refresh, message) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (node) => {
    setIsDeleting(true);
    try {
      await deleteChildNode(node.id);
      message.success('删除成功');
      refresh();
    } catch (error) {
      message.error(error.response?.data?.message || '删除失败');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
};

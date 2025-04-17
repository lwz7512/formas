// hooks/use-modify-root-node.js
import { useState } from 'react';
import { updateRootNode } from '@/api/biztree';

export const useEditRootNode = (refresh, message) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = (node) => {
    setCurrentNode(node);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNode(null);
  };

  const handleSubmit = async (formValues) => {
    if (!currentNode?.id) return;
    
    setLoading(true);
    try {
      await updateRootNode(currentNode.id, formValues);
      message.success('更新成功');
      refresh();
      closeModal();
    } catch (error) {
      message.error(error.response?.data?.message || '更新失败');
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalOpen,
    showModal,
    closeModal,
    handleSubmit,
    currentNode,
    loading
  };
};

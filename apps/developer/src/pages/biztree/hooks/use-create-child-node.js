// hooks/use-create-child-node.js
import { useState } from 'react';
import { createChildNode } from '@/api/biztree'; // Assume you have this API

export const useCreateChildNode = (refresh, message) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentNode, setParentNode] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = (node) => {
    setParentNode(node);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setParentNode(null);
  };

  const handleSubmit = async (formValues) => {
    if (!parentNode?.id) return;
    
    setLoading(true);
    try {
      await createChildNode(parentNode.id, formValues);
      message.success('创建成功');
      refresh();
      closeModal();
    } catch (error) {
      message.error(error.response?.data?.message || '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalOpen,
    showModal,
    closeModal,
    handleSubmit,
    parentNode,
    loading
  };
};

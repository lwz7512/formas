// hooks/use-create-root-node.js
import { useState } from 'react';
import { createRootNode } from '@/api/biztree';

export const useCreateRootNode = (refresh, message) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (formValues) => {
    setLoading(true);
    try {
      await createRootNode(formValues);
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
    formData,
    handleInputChange,
    handleSubmit,
    loading
  };
};

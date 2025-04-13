import { useState } from 'react';
import { createDataSource } from '../../../api/data-source';

export const useCreateDataSource = ({ onSuccess }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleCreateDataSource = async values => {
    setIsCreating(true);
    try {
      await createDataSource(values);
      onSuccess?.();
      closeCreateModal();
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    handleCreateDataSource,
    isCreating,
  };
};

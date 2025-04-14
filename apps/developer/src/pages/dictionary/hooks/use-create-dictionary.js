import { useState } from 'react';
import { createDictionaryItem } from '@/api/dictionary';

export const useCreateDictionary = ({ onSuccess }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleCreateDictionary = async values => {
    setIsCreating(true);
    try {
      await createDictionaryItem(values);
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
    handleCreateDictionary,
    isCreating,
  };
};

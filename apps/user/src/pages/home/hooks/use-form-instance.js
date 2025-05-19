import { useState } from 'react';

import {
  createFormInstance,
  updateFormInstance,
  deleteFormInstance,
} from '@/api/form-instance';

export const useFormInstance = refreshTable => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);

  const [formInstance, setFormInstance] = useState(null);

  const handleOk = async (values, formId) => {
    await createFormInstance(formId, values);
    setIsModalOpen(false);
    refreshTable();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = formInstance => {
    setEditOpen(true);
    setFormInstance(formInstance);
  };

  const closeEditModal = () => {
    setEditOpen(false);
  };

  const handleEditOk = async (values, formId) => {
    const { key, ...rest } = values;
    await updateFormInstance(formId, key, rest);
    setEditOpen(false);
    refreshTable();
  };

  return {
    isModalOpen,
    isEditOpen,
    formInstance,
    handleOk,
    handleCancel,
    openModal,
    openEditModal,
    closeEditModal,
    handleEditOk,
  };
};

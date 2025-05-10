import { useState } from 'react';

import { createFormInstance } from '@/api/form-instance';

export const useFormInstance = createCallback => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async (values, formId) => {
    await createFormInstance(formId, values);
    setIsModalOpen(false);
    createCallback();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return { isModalOpen, handleOk, handleCancel, openModal };
};

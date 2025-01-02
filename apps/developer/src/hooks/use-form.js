import { useState } from 'react';

import { useBizTreeRoots } from '@/hooks/api-biztree';

export const useFormCRUD = () => {
  const { list } = useBizTreeRoots();

  // manage modal state
  const [currentModalName, setCurrentModalName] = useState('');

  const openNewFormModal = () => {
    setCurrentModalName('new-form');
  };

  const closeFormModal = () => {
    setCurrentModalName('');
  };

  const createNewForm = form => {
    console.log(form);
  };

  return {
    isNewFormOpen: currentModalName == 'new-form',
    openNewFormModal,
    closeFormModal,
    createNewForm,
    rootBizSystems: list,
  };
};

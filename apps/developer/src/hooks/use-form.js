import { useState } from 'react';

export const useFormCRUD = () => {
  //
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
  };
};

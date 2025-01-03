import { snakeCase } from 'lodash';

import { useState } from 'react';

import { useBizTreeRoots } from './api-biztree';
import { createFormDefine } from './api-form';

export const useFormCRUD = (onFormCreate, onFormFailure) => {
  const { list } = useBizTreeRoots();

  // manage modal state
  const [currentModalName, setCurrentModalName] = useState('');

  const openNewFormModal = () => {
    setCurrentModalName('new-form');
  };

  const closeFormModal = () => {
    setCurrentModalName('');
  };

  const createNewForm = async form => {
    // console.log(`>>>> to create new form:`);
    const safeForm = { ...form, title: snakeCase(form.title) };
    const resp = await createFormDefine(safeForm);
    // console.log(resp);
    if (resp.errCode == 200) {
      onFormCreate && onFormCreate();
    } else {
      onFormFailure && onFormFailure();
    }
  };

  return {
    isNewFormOpen: currentModalName == 'new-form',
    openNewFormModal,
    closeFormModal,
    createNewForm,
    rootBizSystems: list,
  };
};

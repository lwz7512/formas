import { snakeCase } from 'lodash';

import { useState } from 'react';

import { useBizTreeRoots } from './api-biztree';
import { createFormDefine, useFormList } from './api-form';

export const useFormCRUD = (onFormCreate, onFormFailure) => {
  const { list } = useBizTreeRoots();

  const formList = useFormList();

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
      // reload all the forms
      formList.refreshForms();
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
    ...formList,
  };
};

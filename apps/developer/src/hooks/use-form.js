import { snakeCase } from 'lodash';

import { useState, useEffect } from 'react';

import { useBizTreeRoots } from './api-biztree';
import { createFormDefine, useFormList } from './api-form';

/**
 * for `FormDefinePage` module
 * @param {Function} message
 * @returns
 */
export const useFormPage = (message, moduleId) => {
  const { forms, refreshForms } = useFormList();

  useEffect(() => {
    refreshForms(moduleId);
  }, [refreshForms, moduleId]);

  const onFormCreatSuccess = () => {
    message.success('New form created!');
    refreshForms(moduleId);
  };

  const onFormCreatFailure = () => {
    message.error('New form failed!');
  };

  const { isNewFormOpen, openNewFormModal, closeFormModal, createNewForm } =
    useFormCRUD(onFormCreatSuccess, onFormCreatFailure);

  return {
    forms,
    isNewFormOpen,
    refreshForms,
    openNewFormModal,
    closeFormModal,
    createNewForm,
  };
};

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

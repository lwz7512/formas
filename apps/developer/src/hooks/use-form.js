import { snakeCase } from 'lodash';

import { useState, useEffect } from 'react';

import { ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME } from '@/config';

import { useBizTreeRoots } from './api-biztree';
import { useBizTreeQuery } from './api-biztree';
import { createFormDefine, useFormList } from './api-form';

/**
 * for `FormDefinePage`
 * @param {Function} message
 * @returns
 */
export const useFormPage = message => {
  const { loadTreeBy, treeSelectData } = useBizTreeQuery();

  const [newChildNode, setNewChildNode] = useState({
    pid: '', // to set biz-module id
    title: '',
    description: '',
  });
  const onTreeNodeSelect = (selectedKeys, { node }) => {
    if (node.pos == '0-0') return; // root node
    const [pid] = selectedKeys;
    // console.log(`>>> node clicked: ${pid}`);
    // remember selected parent node
    setNewChildNode({ ...newChildNode, pid });
  };

  const { forms, refreshForms } = useFormList();

  const onFormCreatSuccess = () => {
    message.success('New form created!');
    refreshForms();
  };

  const onFormCreatFailure = () => {
    message.error('New form failed!');
  };

  const { isNewFormOpen, openNewFormModal, closeFormModal, createNewForm } =
    useFormCRUD(onFormCreatSuccess, onFormCreatFailure);

  useEffect(() => {
    loadTreeBy(ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME);
  }, [loadTreeBy]);

  return {
    forms,
    isNewFormOpen,
    newChildNode,
    treeSelectData,
    refreshForms,
    openNewFormModal,
    closeFormModal,
    createNewForm,
    onTreeNodeSelect,
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

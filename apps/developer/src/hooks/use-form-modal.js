import { useState, useEffect } from 'react';

import { ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME } from '@/config';

import { useBizTreeQuery } from './api-biztree';

export const useFormModal = selectedBizModel => {
  const [moduleValue, setModuleValue] = useState();

  const [newFormObject, setFormObject] = useState({
    title: '',
    note: '',
    sequence: 0,
    moduleId: '', // module property placeholder
  });

  // sub - tree - loading
  const { loadTreeBy, treeSelectData } = useBizTreeQuery();

  // ! == load hard-coded tree == !
  useEffect(() => {
    loadTreeBy(ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME);
  }, [loadTreeBy]);

  // observe left-tree module selection: `selectedBizModel`
  useEffect(() => {
    setModuleValue(selectedBizModel);
  }, [selectedBizModel]);

  /**
   * Tree Node Select to manage selected module state:
   * @param {string} newValue
   */
  const onTreeSelectChange = nodeValue => {
    setModuleValue(nodeValue);
  };

  /**
   * Update new root node input
   * @param {string} field new root node field: title | description
   * @param {string} value input value
   */
  const handleFormInputChange = (field, value) => {
    setFormObject({ ...newFormObject, [field]: value });
  };

  const onFormNameChange = event => {
    handleFormInputChange('title', event.target.value);
  };

  const onFormDescChange = event => {
    handleFormInputChange('note', event.target.value);
  };

  const onFormSequenceChange = value => {
    if (!value) return;
    handleFormInputChange('sequence', value);
  };

  return {
    moduleValue,
    /**
     * Export A merged form object with two state:
     */
    newFormObject: { ...newFormObject, moduleId: moduleValue },
    treeSelectData,
    onTreeSelectChange,
    onFormNameChange,
    onFormDescChange,
    onFormSequenceChange,
  };
};

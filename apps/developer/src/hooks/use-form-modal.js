import { useState } from 'react';

import { useBizTreeQuery } from './api-biztree';

export const useFormModal = rootBizSystems => {
  const [moduleValue, setModuleValue] = useState();

  const [newFormObject, setFormObject] = useState({
    title: '',
    note: '',
    sequence: 0,
    moduleId: '',
  });

  // sub - tree - loading
  const { loadTreeBy, treeSelectData } = useBizTreeQuery();

  /**
   * Tree Node Select
   * @param {string} newValue
   */
  const onTreeSelectChange = newValue => {
    setModuleValue(newValue);
  };

  const onPopupScroll = e => {
    console.log('onPopupScroll', e);
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

  const onFormSequenceChange = event => {
    handleFormInputChange('sequence', event.target.value);
  };

  /**
   * load sub tree of selected biz-system
   * @param {string} value biz node id
   */
  const handleRootModuleSelectChange = value => {
    const sysNode = rootBizSystems.find(node => node.id == value);
    console.log(`select item: ${sysNode.title}`);
    loadTreeBy(value, sysNode.title);
  };

  return {
    moduleValue,
    newFormObject,
    treeSelectData,
    onTreeSelectChange,
    onPopupScroll,
    onFormNameChange,
    onFormDescChange,
    onFormSequenceChange,
    handleRootModuleSelectChange,
  };
};

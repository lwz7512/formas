import { useState } from 'react';

import { Modal, Input, InputNumber, Select, TreeSelect } from 'antd';

import { treeData } from './tree';

const { TextArea } = Input;

export const AddNewFormModal = ({
  isFormModalOpen,
  handleFormCreation,
  handleFormModalClose,
}) => {
  const [newFormObject, setFormObject] = useState({
    title: '',
    note: '',
    sequence: 0,
    moduleId: '',
  });

  const [rootNode, setRootNode] = useState('');
  const [moduleValue, setModuleValue] = useState();

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

  const handleRootModuleSelectChange = value => {
    console.log(`select item: ${value}`);
    setRootNode(value);
  };

  return (
    <Modal
      title="Add New Form"
      width={350}
      open={isFormModalOpen}
      onOk={() => handleFormCreation(newFormObject)}
      onCancel={handleFormModalClose}
    >
      <h2>Form Name(English only):</h2>
      <Input
        placeholder="New form name NO space input"
        className=" mb-2"
        value={newFormObject.name}
        onChange={onFormNameChange}
      />
      {/* === Business Module Root Selection === */}
      <h2>Select Business System:</h2>
      <Select
        placeholder="Select a person"
        className="w-full"
        onChange={handleRootModuleSelectChange}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          },
        ]}
      />
      {/* === Business Tree Node Selection === */}
      <h2>Select Business Module:</h2>
      <TreeSelect
        showSearch
        className="w-full"
        value={moduleValue}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onTreeSelectChange}
        treeData={treeData}
        onPopupScroll={onPopupScroll}
      />
      <h2>Form Sequence(Number only):</h2>
      <InputNumber
        placeholder="Form display sequence"
        className=" mb-2 w-full"
        value={newFormObject.sequence}
        onChange={onFormSequenceChange}
      />
      <h2>Form Description(optional)</h2>
      <TextArea
        placeholder="New Node description"
        autoSize={{
          minRows: 2,
          maxRows: 4,
        }}
        value={newFormObject.note}
        onChange={onFormDescChange}
      />
    </Modal>
  );
};

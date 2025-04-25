// modals/create-child-menu.jsx
import { Modal, Input, Select, TreeSelect } from 'antd';
import { useState } from 'react';

/**
 * Add Child Menu Modal
 *
 * @date 2025/04/15
 * @param {object} childMenuObject
 * @param {boolean} isChildMenuOpen
 * @param {function} handleChildMenuCreation
 * @param {function} handleChildModalClose
 * @param {function} handleMenuObjectChange
 * @param {array} dataviewOptions - 新增参数，dataview的下拉树选项
 */
export const AddChildMenuModal = ({
  childMenuObject,
  isChildMenuOpen,
  handleChildMenuCreation,
  handleChildModalClose,
  handleMenuObjectChange,
  dataviewOptions = [], // 默认空数组
}) => {
  const [menuType, setMenuType] = useState(childMenuObject.type || 'dataview');

  const handleTypeChange = (value) => {
    setMenuType(value);
    handleMenuObjectChange('type', value);
  };

  return (
    <Modal
      title="Add Child Menu"
      width={350}
      open={isChildMenuOpen}
      onOk={handleChildMenuCreation}
      onCancel={handleChildModalClose}
    >
      <h2>Menu Name:</h2>
      <Input
        placeholder="New Node label"
        className=" mb-2"
        value={childMenuObject.title}
        onChange={value => handleMenuObjectChange('title', value.target.value)}
      />
      <h2>Menu Type:</h2>
      <Select
        value={menuType}
        style={{ width: '100%' }}
        onChange={handleTypeChange}
        options={[
          { value: 'dataview', label: 'Dataview' },
          { value: 'internal_link', label: 'Internal Link' },
          { value: 'external_link', label: 'External Link' },
        ]}
        className=" mb-2"
      />
      <h2>Menu URL:</h2>
      {menuType === 'dataview' ? (
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          value={childMenuObject.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select a dataview"
          allowClear
          treeDefaultExpandAll
          onChange={value => handleMenuObjectChange('value', value)}
          treeData={dataviewOptions}
          className=" mb-2"
        />
      ) : (
        <Input
          placeholder={menuType === 'internal_link' ? 'Internal Link' : 'External Link'}
          className=" mb-2"
          value={childMenuObject.value}
          onChange={value => handleMenuObjectChange('value', value.target.value)}
        />
      )}
      <h2>Menu Note:</h2>
      <Input
        placeholder="New Menu Note"
        className=" mb-2"
        value={childMenuObject.note}
        onChange={value => handleMenuObjectChange('note', value.target.value)}
      />
    </Modal>
  );
};

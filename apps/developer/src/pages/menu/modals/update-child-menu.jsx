// modals/update-child-menu.jsx
import { Modal, Input, Select, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';

/**
 * Add Child Menu Modal
 *
 * @date 2025/04/15
 * @param {object} childMenuObject
 * @param {boolean} isChildMenuOpen
 * @param {function} handleChildMenuUpdate
 * @param {function} handleChildModalClose
 * @param {function} handleMenuObjectChange
 * @param {array} dataviewOptions - 新增参数，dataview的下拉树选项
 */
export const EditChildMenuModal = ({
  childMenuObject,
  isChildMenuOpen,
  handleChildMenuUpdate,
  handleChildModalClose,
  handleMenuObjectChange,
  dataviewOptions = [], // 默认空数组
}) => {
  const [menuType, setMenuType] = useState('dataview');

  // 添加 useEffect 来响应 childMenuObject.type 的变化
  useEffect(() => {
    if (childMenuObject?.type) {
      setMenuType(childMenuObject.type);
    } else {
      setMenuType('internal_link'); // 回退到默认值
    }
  }, [childMenuObject, isChildMenuOpen]); // 当 childMenuObject 或 modal 打开状态变化时更新

  const handleTypeChange = (value) => {
    setMenuType(value);
    handleMenuObjectChange('type', value);
  };

  return (
    <Modal
      title="Update Child Menu"
      width={350}
      open={isChildMenuOpen}
      onOk={handleChildMenuUpdate}
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

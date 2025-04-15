import { Modal, Input, Select } from 'antd';

/**
 * Add Child Menu Modal
 *
 * @date 2025/04/15
 * @param {object} childMenuObject
 * @param {boolean} isChildMenuOpen
 * @param {function} handleChildMenuCreation
 * @param {function} handleChildModalClose
 * @param {function} handleMenuObjectChange
 */
export const AddChildMenuModal = ({
  childMenuObject,
  isChildMenuOpen,
  handleChildMenuCreation,
  handleChildModalClose,
  handleMenuObjectChange,
}) => (
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
      defaultValue="internal_link"
      style={{ width: '100%' }}
      onChange={value => handleMenuObjectChange('type', value)}
      options={[
        { value: 'internal_link', label: 'Internal Link' },
        { value: 'external_link', label: 'External Link' },
      ]}
      className=" mb-2"
    />
    <h2>Menu URL:</h2>
    <Input
      placeholder="New Menu label"
      className=" mb-2"
      value={childMenuObject.value}
      onChange={value => handleMenuObjectChange('value', value.target.value)}
    />
    <h2>Menu Note:</h2>
    <Input
      placeholder="New Menu Note"
      className=" mb-2"
      value={childMenuObject.note}
      onChange={value => handleMenuObjectChange('note', value.target.value)}
    />
  </Modal>
);

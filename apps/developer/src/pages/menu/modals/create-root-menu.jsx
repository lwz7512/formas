import { Modal, Input, Select } from 'antd';

export const AddRootMenuModal = ({
  rootMenuObject,
  isRootModalOpen,
  handleRootCreation,
  handleRootModalClose,
  handleMenuObjectChange,
}) => (
  <Modal
    title="Add Root Menu"
    width={350}
    open={isRootModalOpen}
    onOk={handleRootCreation}
    onCancel={handleRootModalClose}
  >
    <h2>Menu Name:</h2>
    <Input
      placeholder="New Node label"
      className=" mb-2"
      value={rootMenuObject.title}
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
      value={rootMenuObject.value}
      onChange={value => handleMenuObjectChange('value', value.target.value)}
    />
    <h2>Menu Note:</h2>
    <Input
      placeholder="New Menu Note"
      className=" mb-2"
      value={rootMenuObject.note}
      onChange={value => handleMenuObjectChange('note', value.target.value)}
    />
  </Modal>
);

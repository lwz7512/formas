import { Modal, Input, Select } from 'antd';

export const AddRootMenuModal = ({
  isRootModalOpen,
  handleRootCreation,
  handleRootModalClose,
}) => (
  <Modal
    title="Add Root Menu"
    width={350}
    open={isRootModalOpen}
    onOk={handleRootModalClose}
    onCancel={handleRootModalClose}
  >
    <h2>Menu Name:</h2>
    <Input
      placeholder="New Node label"
      className=" mb-2"
      value=""
      onChange={() => null}
    />
    <h2>Menu Type:</h2>
    <Select
      defaultValue="internal_link"
      style={{ width: '100%' }}
      onChange={value => {
        console.log(`selected ${value}`);
      }}
      options={[
        { value: 'internal_link', label: 'Internal Link' },
        { value: 'external_link', label: 'External Link' },
      ]}
      className=" mb-2"
    />
    <h2>Menu URL:</h2>
    <Input placeholder="New Menu label" className=" mb-2" />
  </Modal>
);

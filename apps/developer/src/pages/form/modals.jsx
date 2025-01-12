import { Modal, Input, InputNumber, TreeSelect } from 'antd';

import { useFormModal } from '@/hooks/use-form-modal';

const { TextArea } = Input;

export const AddNewFormModal = ({
  isFormModalOpen,
  /** biz node selected fro left tree */
  selectedBizModel,
  handleFormCreation,
  handleFormModalClose,
}) => {
  const { newFormObject, moduleValue, treeSelectData, ...handlers } =
    useFormModal(selectedBizModel);

  return (
    <Modal
      title="Add New Form"
      width={350}
      open={isFormModalOpen}
      onOk={() => {
        handleFormCreation(newFormObject);
        handleFormModalClose();
      }}
      onCancel={handleFormModalClose}
    >
      <h2>Form Name(English only):</h2>
      <Input
        placeholder="New form name NO space input"
        className=" mb-2"
        value={newFormObject.name}
        onChange={handlers.onFormNameChange}
      />
      {/* === Business Tree Node Selection === */}
      <h2>Select Business Module:</h2>
      <TreeSelect
        className="w-full"
        value={moduleValue}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={handlers.onTreeSelectChange}
        treeData={treeSelectData}
      />
      <h2>Form Sequence(Number only):</h2>
      <InputNumber
        placeholder="Form display sequence"
        className=" mb-2 w-full"
        value={newFormObject.sequence}
        onChange={handlers.onFormSequenceChange}
      />
      <h2>Form Description(optional)</h2>
      <TextArea
        placeholder="New Node description"
        autoSize={{
          minRows: 2,
          maxRows: 4,
        }}
        value={newFormObject.note}
        onChange={handlers.onFormDescChange}
      />
    </Modal>
  );
};

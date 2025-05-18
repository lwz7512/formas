import { Modal } from 'antd';
// use form-render to render the form with schema
// @2025-05-18
import FormRender, { useForm } from '@formas/form-render';

export const CreateFormInstanceModal = ({
  visible,
  onOk,
  onCancel,
  dataview,
  schema,
}) => {
  const form = useForm();

  const emptyDataview = { columns: [], formId: '' };
  const { formId } = dataview || emptyDataview;

  const handleSubmit = async () => {
    const values = await form.validateFields();
    // console.log('values', values);
    onOk(values, formId);
  };

  return (
    <Modal
      title="Create Form Instance"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <FormRender schema={schema} form={form} />
    </Modal>
  );
};

import { Modal } from 'antd';
// use form-render to render the form with schema
// @2025-05-18
import FormRender, { useForm } from '@formas/form-render';

/**
 * Edit Form Instance Modal
 *
 * @param {string} action - 'Create' or 'Edit'
 * @param {boolean} visible - whether the modal is visible
 * @param {function} onOk - callback when the form is submitted
 * @param {function} onCancel - callback when the modal is closed
 * @param {object} dataview - the dataview object
 * @param {object} schema - the schema object
 * @param {object | null} formInstance - the form instance object
 */
export const UpdateFormInstanceModal = ({
  visible,
  onOk,
  onCancel,
  dataview,
  schema,
  formInstance,
}) => {
  // use form-render to render the form with schema and formInstance
  const form = useForm({
    formData: formInstance,
  });

  const emptyDataview = { columns: [], formId: '' };
  const { formId } = dataview || emptyDataview;

  const handleSubmit = async () => {
    const values = await form.validateFields();
    // console.log('values', values);
    onOk(values, formId);
  };

  return (
    <Modal
      title="Edit Form Instance"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <FormRender schema={schema} form={form} />
    </Modal>
  );
};

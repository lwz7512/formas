import { Button, Form, Input, InputNumber, Modal } from 'antd';

export const CreateDictionaryModal = ({
  visible,
  initialValues = {
    category: '',
    label: '',
    value: '',
    sequence: 0
  },
  onCancel,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Create New Dictionary Item"
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Create
        </Button>,
      ]}
    >
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialValues}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input category' }]}
        >
          <Input placeholder="e.g. user_status" />
        </Form.Item>

        <Form.Item
          label="Label"
          name="label"
          rules={[{ required: true, message: 'Please input display label' }]}
        >
          <Input placeholder="e.g. Active" />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
          rules={[{ required: true, message: 'Please input value' }]}
        >
          <Input placeholder="e.g. active" />
        </Form.Item>

        <Form.Item
          label="Sequence"
          name="sequence"
          rules={[{ required: true, message: 'Please input sequence number' }]}
        >
          <InputNumber 
            min={0} 
            style={{ width: '100%' }} 
            placeholder="e.g. 1" 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
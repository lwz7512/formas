// components/form-create.jsx
import { Modal, Input, InputNumber, Form } from 'antd';

const { TextArea } = Input;

export const FormCreateModel = ({ visible, onCancel, onSubmit, moduleId }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const success = await onSubmit({ ...values, moduleId });
      if (success) {
        form.resetFields();
        onCancel();
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title="新建表单"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="表单名称"
          rules={[{ required: true, message: '请输入表单名称' }]}
        >
          <Input placeholder="请输入表单名称" />
        </Form.Item>
        <Form.Item
          name="sequence"
          label="排序序号"
          initialValue={0}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="note"
          label="表单描述"
        >
          <TextArea placeholder="请输入表单描述" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

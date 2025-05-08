// models/module-edit.jsx
import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

export const ModuleEditModal = ({
  open,
  onClose,
  onSubmit,
  module,
  isLoading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (module) {
      form.setFieldsValue({
        title: module.title,
        description: module.description,
      });
    }
  }, [module, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const success = await onSubmit(values);
      if (success) onClose();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title="编辑模块"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={isLoading}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="模块名称"
          rules={[{ required: true, message: '请输入模块名称' }]}
        >
          <Input placeholder="请输入模块名称" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="模块描述"
        >
          <TextArea placeholder="可选描述信息" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

// models/module-create.jsx
import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

export const ModuleCreateModel = ({ 
  open, 
  onClose,
  onSubmit,
  parentModule,
  isLoading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

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
      title={`新增模块${parentModule?.title ? `到【${parentModule.title}】` : ''}`}
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
          <Input placeholder="例如: 预算管理系统" />
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

// src/models/create-module.jsx
import { useEffect } from 'react';
import { Modal, Input, Form } from 'antd';

const { TextArea } = Input;

export const CreateModuleModal = ({ 
  visible, 
  onOk, 
  onClose,
  parentModule = { title: '', description: '' },
  loading
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: '',
        code: '',
        description: ''
      });
    }
  }, [visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onOk(values);
      form.resetFields();
    } catch (error) {
      console.error('验证失败:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`新增模块${parentModule?.title ? `到【${parentModule.title}】` : ''}`}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="模块名称"
          name="name"
          rules={[{ required: true, message: '请输入模块名称' }]}
        >
          <Input placeholder="例如: 预算管理系统" />
        </Form.Item>
        
        <Form.Item
          label="模块编码"
          name="code"
          rules={[
            { required: true, message: '请输入模块编码' },
            { 
              pattern: /^[A-Z_]+$/,
              message: '只能包含大写字母和下划线' 
            }
          ]}
        >
          <Input placeholder="例如: BUDGET_MANAGEMENT" />
        </Form.Item>
        
        <Form.Item
          label="模块描述"
          name="description"
        >
          <TextArea placeholder="可选描述信息" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

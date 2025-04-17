// models/create-root-node.jsx
import { useEffect } from 'react';
import { Modal, Input, Form } from 'antd';

const { TextArea } = Input;

export const CreateRootNodeModal = ({ 
  visible, 
  onOk, 
  onClose,
  node = { title: '', description: '' },
  loading
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {  // Only set fields when modal is visible
      form.setFieldsValue({
        title: node.title,
        description: node.description
      });
    }
  }, [node, form, visible]);  // Added visible to dependencies

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
      title="添加根节点"
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnClose  // This ensures form is reset when modal is closed
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="节点名称"
          name="title"
          rules={[{ required: true, message: '请输入节点名称' }]}
        >
          <Input placeholder="例如: 华东地区总部" />
        </Form.Item>
        <Form.Item
          label="节点描述"
          name="description"
        >
          <TextArea placeholder="可选描述信息" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

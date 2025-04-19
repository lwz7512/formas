// models/create-child-node.jsx
import { useEffect } from 'react';
import { Modal, Input, Form } from 'antd';

const { TextArea } = Input;

export const CreateChildNodeModal = ({ 
  visible, 
  onOk, 
  onClose,
  parentNode = { title: '', description: '' },
  loading
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        title: '',
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
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`添加子节点到 【${parentNode?.title || ''}】`}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="节点名称"
          name="title"
          rules={[{ required: true, message: '请输入节点名称' }]}
        >
          <Input placeholder="例如: 上海分公司" />
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

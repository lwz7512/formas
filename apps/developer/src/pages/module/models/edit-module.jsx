// models/edit-module.jsx
import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

export const EditModuleModal = ({
  visible,
  onOk,
  onClose,
  moduleData,
  loading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (moduleData) {
      form.setFieldsValue({
        title: moduleData.title,
        // Add other fields if needed
        description: moduleData.description,
      });
    }
  }, [moduleData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onOk(values);  // 等待操作完成
      form.resetFields();  // 重置表单
    } catch (error) {
      console.error('Validation or submission failed:', error);
      throw error; // 抛出错误让Modal保持打开
    }
  };

  return (
    <Modal
      title="编辑模块"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="模块名称"
          rules={[{ required: true, message: '请输入模块名称' }]}
        >
          <Input placeholder="请输入模块名称" />
        </Form.Item>
        {/* Add other form fields if needed */}
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

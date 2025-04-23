// components/dataview-edit.jsx
import { Form, Modal, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

export const DataviewEditModel = ({
  visible,
  record,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && record) {
      form.setFieldsValue({
        sequence: record.sequence,
        title: record.title,
        note: record.note,
      });
    } else {
      form.resetFields();
    }
  }, [visible, record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSave(values);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title="编辑视图"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="sequence"
          label="序号"
          rules={[{ required: true, message: '请输入序号' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="note"
          label="备注"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

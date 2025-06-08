// modals/presentation-create.jsx

import { Modal, Form, Input, Select } from 'antd';

export const PresentationCreateModel = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const success = await onSubmit(values);
      console.log(success);
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
      title="新建呈现"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="标题" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="chartType" label="类型" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="table">表格</Select.Option>
            <Select.Option value="list">列表</Select.Option>
            <Select.Option value="tree">树形</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="sequence" label="序号" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="note" label="备注">
          <Input.TextArea type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

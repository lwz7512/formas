// modals/presentation-create.jsx
import { useEffect } from 'react';

import { Modal, Form, Input, Select } from 'antd';

export const PresentationEditModel = ({
  presentation,
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && presentation) {
      const { sequence, title, note, chartType } = presentation;
      form.setFieldsValue({
        sequence,
        title,
        note,
        chartType,
      });
    } else {
      form.resetFields();
    }
  }, [presentation, form, visible]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // call update presentation api:
      const success = await onSubmit({
        ...values,
        // ! `id` is required by backend!
        id: presentation.id,
        // ! `dataviewId` is required by backend!
        dataviewId: presentation.dataviewId,
        // ! `moduleId` is required by backend!
        moduleId: presentation.moduleId,
      });
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
      title="编辑呈现"
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

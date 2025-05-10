import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

// const { TextArea } = Input;

export const CreateFormInstanceModal = ({
  visible,
  onOk,
  onCancel,
  dataview,
}) => {
  const [form] = Form.useForm();

  const emptyDataview = { columns: [], formId: '' };
  const { columns, formId } = dataview || emptyDataview;

  const noIDColumns = columns.filter(column => column.key !== 'id');

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onOk(values, formId);
  };

  return (
    <Modal
      title="Create Form Instance"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" className="mt-6">
        {noIDColumns.map(column => (
          <Form.Item
            key={column.key}
            label={column.title}
            className="mb-2"
            name={column.name}
            rules={[{ required: true, message: '请输入' + column.label }]}
          >
            <Input placeholder={column.placeholder} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

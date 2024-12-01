import { Button, Form, Input } from 'antd';

export const NewDictionaryForm = ({ onFinish, onFinishFailed }) => {
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        category: '',
        label: '',
        value: '',
        sequence: 0,
      }}
      style={{
        display: 'flex',
        gap: '12px',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* == Category Field == */}
      <Form.Item
        label="Category"
        name="category"
        style={{ marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: 'Please input category!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* == Label Field == */}
      <Form.Item
        label="Label"
        name="label"
        style={{ marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: 'Please input label!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* == Value Field */}
      <Form.Item
        label="Value"
        name="value"
        style={{ marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: 'Please input value!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* == Sequence Field */}
      <Form.Item
        label="Sequence(order)"
        name="sequence"
        style={{ marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: 'Please input sequence!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={null} style={{ marginBottom: 0, paddingTop: 28 }}>
        <Button type="primary" htmlType="submit">
          Add Item
        </Button>
      </Form.Item>
    </Form>
  );
};

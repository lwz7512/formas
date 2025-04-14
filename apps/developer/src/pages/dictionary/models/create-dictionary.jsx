import { Modal, Form, Input, Select, Button, message } from 'antd';

const DRIVER_OPTIONS = [
  { label: 'MySQL', value: 'mysql' },
  { label: 'MariaDB', value: 'mariadb' },
  { label: 'SQL Server', value: 'sqlserver' },
  { label: 'PostgreSQL', value: 'postgresql' },
  { label: 'Oracle', value: 'oracle' }
];

const DEFAULT_OPTIONS = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 }
];

export const CreateDictionaryModal = ({
  visible,
  initialValues,
  onCancel,
  onSubmit,
  loading
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      message.error('Please fill all required fields correctly');
    }
  };

  return (
    <Modal
      title="Create New Data Source"
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading}
          onClick={handleSubmit}
        >
          Create
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          label="Data Source Title"
          name="title"
          rules={[{ required: true, message: 'Please input a title' }]}
        >
          <Input placeholder="e.g. Production Database" />
        </Form.Item>

        <Form.Item
          label="Database Driver"
          name="driver"
          rules={[{ required: true, message: 'Please select a driver' }]}
        >
          <Select 
            placeholder="Select database type"
            options={DRIVER_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Default Data Source"
          name="isDefault"
        >
          <Select options={DEFAULT_OPTIONS} />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Host"
            name="host"
            rules={[{ required: true, message: 'Please input host address' }]}
          >
            <Input placeholder="e.g. 127.0.0.1" />
          </Form.Item>

          <Form.Item
            label="Port"
            name="port"
            rules={[{ required: true, message: 'Please input port number' }]}
          >
            <Input placeholder="e.g. 3306" />
          </Form.Item>
        </div>

        <Form.Item
          label="Database Name"
          name="database"
          rules={[{ required: true, message: 'Please input database name' }]}
        >
          <Input placeholder="e.g. my_database" />
        </Form.Item>

        <Form.Item
          label="Instance (Optional)"
          name="instance"
        >
          <Input placeholder="For SQL Server named instances" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Username"
            name="user"
            rules={[{ required: true, message: 'Please input username' }]}
          >
            <Input placeholder="Database username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input password' }]}
          >
            <Input.Password placeholder="Database password" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
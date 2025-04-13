import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

export const ModifyDataSourceModal = ({
  visible,
  datasource = {},
  onSubmit,
  onClose,
  loading
}) => {
  const [form] = Form.useForm();

  // 初始化表单数据
  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue({
        isDefault: 0, // 默认值
        ...datasource // 覆盖传入的数据
      });
    }
  }, [visible, datasource, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('提交数据:', values); // 调试用
      await onSubmit(values);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title="修改数据源"
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      forceRender
      width={600}
    >
      <Form form={form} layout="vertical">
        {/* 数据源名称 */}
        <Form.Item
          name="title"
          label="数据源名称"
          rules={[{ required: true, message: '请输入数据源名称' }]}
        >
          <Input placeholder="例如: 生产数据库" />
        </Form.Item>

        {/* 数据库类型 */}
        <Form.Item
          name="driver"
          label="数据库类型"
          rules={[{ required: true, message: '请选择数据库类型' }]}
        >
          <Select
            options={[
              { label: 'MySQL', value: 'mysql' },
              { label: 'MariaDB', value: 'mariadb' },
              { label: 'SQL Server', value: 'sqlserver' },
              { label: 'PostgreSQL', value: 'postgresql' },
              { label: 'Oracle', value: 'oracle' }
            ]}
            placeholder="请选择数据库类型"
          />
        </Form.Item>

        {/* 是否默认 */}
        <Form.Item name="isDefault" label="设为默认数据源">
          <Select
            options={[
              { label: '是', value: 1 },
              { label: '否', value: 0 }
            ]}
          />
        </Form.Item>

        {/* 连接信息 - 两列布局 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="host"
            label="主机地址"
            rules={[{ required: true, message: '请输入主机地址' }]}
          >
            <Input placeholder="例如: 127.0.0.1" />
          </Form.Item>

          <Form.Item
            name="port"
            label="端口号"
            rules={[{ required: true, message: '请输入端口号' }]}
          >
            <Input placeholder="例如: 3306" />
          </Form.Item>
        </div>

        {/* 数据库名称 */}
        <Form.Item
          name="database"
          label="数据库名称"
          rules={[{ required: true, message: '请输入数据库名称' }]}
        >
          <Input placeholder="例如: my_database" />
        </Form.Item>

        {/* 实例名称 (SQL Server专用) */}
        <Form.Item name="instance" label="实例名称 (可选)">
          <Input placeholder="SQL Server命名实例使用" />
        </Form.Item>

        {/* 认证信息 - 两列布局 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="user"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="数据库用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="数据库密码" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
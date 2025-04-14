import { useEffect } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

export const ModifyDictionaryModal = ({
  visible,
  dictionaryItem = {},
  onSubmit,
  onClose,
  loading,
}) => {
  const [form] = Form.useForm();

  // 初始化表单数据
  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue({
        category: dictionaryItem.category || '',
        label: dictionaryItem.label || '',
        value: dictionaryItem.value || '',
        sequence: dictionaryItem.sequence || 0,
      });
    }
  }, [visible, dictionaryItem, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
  };

  return (
    <Modal
      title="修改字典项"
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      width={600}
      okText="保存"
      cancelText="取消"
    >
      <Form form={form} layout="vertical">
        {/* 分类 */}
        <Form.Item
          name="category"
          label="分类"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input placeholder="例如: user_status" />
        </Form.Item>

        {/* 显示名称 */}
        <Form.Item
          name="label"
          label="显示名称"
          rules={[{ required: true, message: '请输入显示名称' }]}
        >
          <Input placeholder="例如: 活跃用户" />
        </Form.Item>

        {/* 实际值 */}
        <Form.Item
          name="value"
          label="值"
          rules={[{ required: true, message: '请输入值' }]}
        >
          <Input placeholder="例如: active" />
        </Form.Item>

        {/* 排序序号 */}
        <Form.Item
          name="sequence"
          label="排序序号"
          rules={[{ required: true, message: '请输入排序序号' }]}
        >
          <InputNumber 
            min={0} 
            style={{ width: '100%' }} 
            placeholder="例如: 1" 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// modals/dropdown-designer.jsx
import React, { useState, useEffect } from 'react';
import { 
  Modal, Tabs, Form, Select, Table, Button, Space, 
  Divider, message, Badge, Spin, Empty, Input
} from 'antd';
import { 
  SyncOutlined, EyeOutlined, SettingOutlined, 
  ArrowLeftOutlined, ArrowRightOutlined 
} from '@ant-design/icons';

const DropdownDesignerModal = ({
  visible,
  config,
  onSave,
  onCancel,
  viewId,
  initialColumns = [],  // 直接从props接收列数据
  previewData = [],
  previewLoading = false,
  onLoadPreviewData,
}) => {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('config');
  const [hasChanges, setHasChanges] = useState(false);
  const [columns, setColumns] = useState(initialColumns || []);
  const [selectedKeyColumn, setSelectedKeyColumn] = useState(null);
  const [selectedValueColumn, setSelectedValueColumn] = useState(null);
  const [columnsLoading, setColumnsLoading] = useState(false);

  useEffect(() => {
    if (visible && initialColumns) {
      setColumns(initialColumns);
      // setSelectedColumns(initialColumns.filter(col => col.visible));
      setHasChanges(false);
    }
  }, [visible, initialColumns]);

  // 初始化表单数据
  useEffect(() => {
    if (visible) {
      form.resetFields();
      
      if (config) {
        form.setFieldsValue({
          keyColumn: config.keyColumn,
          valueColumn: config.valueColumn,
          field: config.field,
        });
        setSelectedKeyColumn(config.keyColumn);
        setSelectedValueColumn(config.valueColumn);
      }
      
      setHasChanges(false);
    }
  }, [visible, config, form]);

  // 处理配置变化
  const handleColumnSelect = () => {
    setHasChanges(true);
  };

  // 保存配置
  const handleOk = () => {
    form.validateFields().then(values => {
      if (!values.keyColumn || !values.valueColumn) {
        message.warning('请选择Key列和Value列');
        return;
      }
      onSave?.({
        ...values,
        keyColumn: values.keyColumn,
        valueColumn: values.valueColumn,
      });
    });
  };

  // 列选择器组件
  const ColumnSelector = ({ name, label, value, onChange }) => (
    <Select
      loading={columnsLoading}
      placeholder={`选择${label}`}
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
      dropdownRender={menu => (
        <>
          {initialColumns.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="无可用列" />
          ) : (
            menu
          )}
        </>
      )}
    >
      {columns.map(col => (
        <Select.Option 
          key={col.dataIndex} 
          value={col.dataIndex}
          disabled={col.disabled}
        >
          {col.title}
        </Select.Option>
      ))}
    </Select>
  );

  // Tab配置项
  const tabItems = [
    {
      key: 'config',
      label: (
        <Space>
          <SettingOutlined />
          <span>列配置</span>
          {hasChanges && <SyncOutlined spin style={{ color: '#1890ff' }} />}
        </Space>
      ),
      children: (
        <div style={{ padding: '16px 0' }}>
          <Form form={form} layout="vertical">
            <Space size="large" style={{ width: '100%' }}>
              <Form.Item
                name="keyColumn"
                label="Key列"
                rules={[{ required: true, message: '请选择Key列' }]}
                style={{ flex: 1 }}
              >
                <ColumnSelector
                  label="Key列"
                  value={selectedKeyColumn}
                  onChange={(value) => {
                    setSelectedKeyColumn(value);
                    handleColumnSelect();
                  }}
                />
              </Form.Item>
              
              <div style={{ paddingTop: '30px' }}>
                <ArrowRightOutlined />
              </div>
              
              <Form.Item
                name="valueColumn"
                label="Value列"
                rules={[{ required: true, message: '请选择Value列' }]}
                style={{ flex: 1 }}
              >
                <ColumnSelector
                  label="Value列"
                  value={selectedValueColumn}
                  onChange={(value) => {
                    setSelectedValueColumn(value);
                    handleColumnSelect();
                  }}
                />
              </Form.Item>
            </Space>
          </Form>
        </div>
      ),
    },
    {
      key: 'preview',
      label: (
        <Space>
          <EyeOutlined />
          <span>数据预览</span>
          <Badge
            count={previewData.length}
            style={{ backgroundColor: '#1890ff' }}
          />
        </Space>
      ),
      children: (
        <div style={{ padding: '16px 0' }}>
          {selectedKeyColumn && selectedValueColumn ? (
            <Table
              dataSource={previewData}
              rowKey={(record) => `${record[selectedKeyColumn]}_${record[selectedValueColumn]}`}
              pagination={false}
              size="small"
              scroll={{ y: 400 }}
              loading={previewLoading}
              columns={[
                {
                  title: 'Key',
                  dataIndex: selectedKeyColumn,
                  width: '50%',
                  render: (text) => text || <span style={{ color: '#ccc' }}>空值</span>,
                },
                {
                  title: 'Value',
                  dataIndex: selectedValueColumn,
                  width: '50%',
                  render: (text) => text || <span style={{ color: '#ccc' }}>空值</span>,
                },
              ]}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              请先配置Key列和Value列
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={`下拉列表设计器 - ${viewId || '新建下拉列表'}`}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={1000}
      styles={{
        body: {
          padding: '16px 24px',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button
            type="primary"
            onClick={handleOk}
            loading={previewLoading}
            disabled={!hasChanges}
          >
            保存配置
          </Button>
          <Button
            icon={<SyncOutlined />}
            onClick={() => {
              setActiveKey(activeKey === 'config' ? 'preview' : 'config');
              onLoadPreviewData?.();
            }}
          >
            切换{activeKey === 'config' ? '预览' : '配置'}
          </Button>
        </Space>
      }
    >
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={tabItems}
        style={{ height: '100%' }}
        destroyInactiveTabPane={false}
      />
    </Modal>
  );
};

export default DropdownDesignerModal;

// modals/dataview-designer.jsx
import React, { useState, useEffect } from 'react';
import { Badge, Button, Divider, Modal, Space, Tabs, message } from 'antd';
import { SyncOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import ViewDesignerColumnManager from '../components/column-manager';
import {PreviewDataTable} from '../components/preview-table';

const ViewDesignerModal = ({ 
  visible, 
  initialColumns, 
  onSave, 
  onCancel,
  loading,
  viewId,
  previewData = [],
  previewLoading = false
}) => {
  const [columns, setColumns] = useState(initialColumns || []);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [activeKey, setActiveKey] = useState('config');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (visible && initialColumns) {
      setColumns(initialColumns);
      setSelectedColumns(initialColumns.filter(col => col.visible));
      setHasChanges(false);
    }
  }, [visible, initialColumns]);

  // 处理配置变化
  const handleColumnsChange = newColumns => {
    setColumns(newColumns);
    setHasChanges(true);
  };

  const handleOk = () => {
    if (selectedColumns.length === 0) {
      message.warning('请至少选择一列');
      return;
    }
    onSave?.(columns, selectedColumns);
  };

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
        <ViewDesignerColumnManager
          dataSource={columns}
          onColumnsChange={setColumns}
          onSelectedColumnsChange={setSelectedColumns}
        />
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
        <PreviewDataTable
          columnsConfig={columns}
          selectedColumns={selectedColumns}
          data={previewData}
          loading={previewLoading}
        />
      ),
    },
  ];

  return (
    <Modal
      title={`视图设计器 - ${viewId || '新建视图'}`}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={1200}
      styles={{
        body: {
          padding: '16px 24px',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button
            type="primary"
            onClick={() => onSave(columns, selectedColumns)}
            loading={loading}
          >
            保存配置
          </Button>
          <Button
            icon={<SyncOutlined />}
            onClick={() =>
              setActiveKey(activeKey === 'config' ? 'preview' : 'config')
            }
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

export default ViewDesignerModal;

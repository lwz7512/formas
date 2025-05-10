// modals/dataview-designer.jsx
import React, { useState } from 'react';
import { Button, Divider, Modal, Space, message } from 'antd';
import ViewDesignerColumnManager from '../components/column-manager';

const ViewDesignerModal = ({ 
  visible, 
  initialColumns, 
  onSave, 
  onCancel 
}) => {
  const [columns, setColumns] = useState(initialColumns || []);
  const [selectedColumns, setSelectedColumns] = useState([]);

  // 初始化数据
  React.useEffect(() => {
    setColumns(initialColumns || []);
  }, [initialColumns]);

  const handleOk = () => {
    if (selectedColumns.length === 0) {
      message.warning('请至少选择一列');
      return;
    }
    onSave?.(columns, selectedColumns);
  };

  return (
    <Modal
      title="视图设计器"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={1000}
      styles={{
        body: {
          padding: '16px 24px'
        }
      }}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={handleOk}>
            保存配置
          </Button>
        </Space>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <p>拖拽可调整列顺序，配置列显示属性</p>
      </div>
      
      <ViewDesignerColumnManager
        dataSource={columns}
        onColumnsChange={setColumns}
        onSelectedColumnsChange={setSelectedColumns}
      />
      
      <Divider />
      
      <div>
        <h4>当前选中列：</h4>
        {selectedColumns.length > 0 ? (
          <ul>
            {selectedColumns.map(col => (
              <li key={col.dataIndex}>
                {col.title} ({col.dataIndex}, {col.width ? `${col.width}px` : '自动宽度'})
              </li>
            ))}
          </ul>
        ) : (
          <p>未选择任何列</p>
        )}
      </div>
    </Modal>
  );
};

export default ViewDesignerModal;

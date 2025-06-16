// components/presentation-table.jsx
import { useState } from 'react';

import { Table, Button, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined, TableOutlined } from '@ant-design/icons';

import ViewDesignerModal from '../modals/dataview-designer';
import { PresentationEditModel } from '../modals/presentation-edit';
import { useDataviewColumn } from '../hooks/use-dataview-column';

export const PresentationTable = ({
  loading,
  presents,
  handleDelete,
  handleEditSubmit,
}) => {
  const [isEditPresentationOpen, setIsEditPresentationOpen] = useState(false);
  const [currentPresentation, setCurrentPresentation] = useState(null);

  const handleEditOpen = presentation => {
    setCurrentPresentation(presentation);
    setIsEditPresentationOpen(true);
  };

  const closeEditPresentation = () => {
    setIsEditPresentationOpen(false);
    setCurrentPresentation(null);
  };

  // 使用设计器hooks
  const {
    currentViewId,
    designerVisible,
    loading: designerLoading,
    columnConfig,
    closeDesigner,
    openDesigner,
    handleSaveColumnConfig,
    previewData,
    loadPreviewData,
  } = useDataviewColumn();

  // 保存列配置的处理函数
  const onSaveColumnConfig = async (columns, selectedColumns) => {
    try {
      await handleSaveColumnConfig({ columns, selectedColumns });
      // closeDesigner();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'chartType',
      key: 'chartType',
    },
    {
      title: '关联视图',
      dataIndex: 'dataviewTitle',
      key: 'dataviewTitle',
    },
    {
      title: '关联表单',
      dataIndex: 'formTitle',
      key: 'formTitle',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          {/* 编辑 */}
          <Button
            type="link"
            size="small"
            onClick={() => handleEditOpen(record)}
          >
            <EditOutlined />
          </Button>
          {/* 删除 */}
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          {/* 设计表格 */}
          {record.chartType === 'table' && (
            <Button
              type="link"
              size="small"
              title="Design table"
              onClick={() => openDesigner(record['dataviewId'])}
            >
              <TableOutlined />
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={presents}
        bordered={false}
        size="middle"
        loading={loading}
      />
      <ViewDesignerModal
        visible={designerVisible}
        initialColumns={columnConfig?.columns}
        viewId={currentViewId}
        loading={designerLoading}
        previewData={previewData}
        onSave={onSaveColumnConfig}
        onCancel={closeDesigner}
        onLoadPreviewData={loadPreviewData}
      />
      <PresentationEditModel
        presentation={currentPresentation}
        visible={isEditPresentationOpen}
        onCancel={closeEditPresentation}
        onSubmit={handleEditSubmit}
      />
    </>
  );
};

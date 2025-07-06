// components/presentation-table.jsx
import { useState } from 'react';
import { Table, Button, Popconfirm, Space, Dropdown, Menu } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  TableOutlined,
  DownOutlined,
} from '@ant-design/icons';

import ViewDesignerModal from '../modals/dataview-designer';
import { PresentationEditModel } from '../modals/presentation-edit';
import { useDataviewColumn } from '../hooks/use-dataview-column';
import DropdownDesignerModal from '../modals/dropdown-designer';

export const PresentationTable = ({
  loading,
  presents,
  handleDelete,
  handleEditSubmit,
}) => {
  const [isEditPresentationOpen, setIsEditPresentationOpen] = useState(false);
  const [currentPresentation, setCurrentPresentation] = useState(null);

  // 下拉列表设计器状态
  const [dropdownDesignerVisible, setDropdownDesignerVisible] = useState(false);
  const [currentDropdownConfig, setCurrentDropdownConfig] = useState(null);

  const handleEditOpen = presentation => {
    setCurrentPresentation(presentation);
    setIsEditPresentationOpen(true);
  };

  const closeEditPresentation = () => {
    setIsEditPresentationOpen(false);
    setCurrentPresentation(null);
  };

  console.log('presents', presents);

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
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 打开下拉列表设计器
  const openDropdownDesigner = presentation => {
    setCurrentDropdownConfig({
      id: presentation.id,
      options: presentation.dropdownOptions || [],
      field: presentation.field,
    });
    setDropdownDesignerVisible(true);
  };

  const closeDropdownDesigner = () => {
    setDropdownDesignerVisible(false);
    setCurrentDropdownConfig(null);
  };

  const handleSaveDropdownConfig = async config => {
    try {
      // 这里通常会调用API保存下拉列表配置
      console.log('保存下拉列表配置:', config);
      closeDropdownDesigner();
    } catch (error) {
      console.error('保存下拉列表配置失败:', error);
    }
  };

  // 操作菜单
  const getActionMenu = record => {
    const items = [
      {
        key: 'edit',
        label: (
          <span>
            <EditOutlined /> 编辑
          </span>
        ),
        onClick: () => handleEditOpen(record),
      },
      {
        key: 'delete',
        label: (
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <span>
              <DeleteOutlined /> 删除
            </span>
          </Popconfirm>
        ),
      },
    ];

    // 表格类型显示表格设计器
    if (record.chartType === 'table') {
      items.push({
        key: 'design-table',
        label: (
          <span>
            <TableOutlined /> 设计表格
          </span>
        ),
        onClick: () => openDesigner(record['dataviewId']),
      });
    }

    // 列表类型显示下拉列表设计器
    if (record.chartType === 'list') {
      items.push({
        key: 'design-dropdown',
        label: (
          <span>
            <DownOutlined /> 设计下拉列表
          </span>
        ),
        onClick: () => openDropdownDesigner(record),
      });
    }

    return items;
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
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Dropdown menu={{ items: getActionMenu(record) }}>
            <Button type="link" size="small">
              操作 <DownOutlined />
            </Button>
          </Dropdown>
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

      {/* 下拉列表设计器模态框，仅当chartType为list时显示 */}
      <DropdownDesignerModal
        visible={dropdownDesignerVisible}
        initialColumns={columnConfig?.columns}
        previewData={previewData}
        config={currentDropdownConfig}
        onSave={handleSaveDropdownConfig}
        onCancel={closeDropdownDesigner}
      />
    </>
  );
};

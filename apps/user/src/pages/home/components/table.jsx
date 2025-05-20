// components/table.jsx
import "./style.css";
import { Table, Space, Button, Tooltip, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const ViewInstanceTable = ({
  columns,
  rows = [],
  pagination,
  loading,
  onChange,
  openDataviewEditModal,
  openDataviewDeleteModal,
  sorter,
}) => {
  const [filters, setFilters] = useState({});
  const [searchTypes, setSearchTypes] = useState({});

  const OPERATORS = [
    { label: '等于', value: 'eq' },
    { label: '包含', value: 'like' },
    { label: '大于', value: 'gt' },
    { label: '小于', value: 'lt' },
    { label: '不等于', value: 'ne' },
  ];

  // 创建操作列
  const actionColumn = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 120,
    render: (_, record) => (
      <Space size={0} className="action-buttons">
        <Tooltip title="编辑">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openDataviewEditModal(record)}
          />
        </Tooltip>
        <Tooltip title="删除">
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDataviewDeleteModal(record)}
          />
        </Tooltip>
      </Space>
    ),
  };

  // 处理查询确认
  const handleSearchConfirm = (dataIndex, selectedKeys, confirm) => {
    if (selectedKeys.length > 0) {
      const { value, operator } = selectedKeys[0];
      const newFilters = { ...filters, [dataIndex]: { value, operator } };
      setFilters(newFilters);
      onChange(pagination, newFilters, sorter);
    }
    confirm();
  };

  // 重置查询
  const handleReset = (dataIndex, clearFilters, confirm) => {
    const newFilters = { ...filters };
    delete newFilters[dataIndex];
    setFilters(newFilters);
    clearFilters();
    onChange(pagination, newFilters, sorter);
    confirm();
  };

  // 生成列查询组件
  const getColumnSearchProps = (dataIndex, title, columnType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      // 初始化操作符类型
      if (!searchTypes[dataIndex]) {
        setSearchTypes(prev => ({ ...prev, [dataIndex]: 'eq' }));
      }

      return (
        <div style={{ padding: 8, width: 240 }}>
          <div style={{ marginBottom: 8 }}>
            <Select
              style={{ width: '100%' }}
              placeholder="选择查询方式"
              value={searchTypes[dataIndex]}
              onChange={(value) => {
                setSearchTypes(prev => ({ ...prev, [dataIndex]: value }));
                if (selectedKeys.length > 0) {
                  setSelectedKeys([{ ...selectedKeys[0], operator: value }]);
                }
              }}
              options={OPERATORS.filter(op => 
                columnType === 'number' 
                  ? ['eq', 'gt', 'lt', 'ne'].includes(op.value)
                  : ['eq', 'like', 'ne'].includes(op.value)
              )}
            />
          </div>
          <Input
            placeholder={`输入${title}`}
            value={selectedKeys?.[0]?.value || ''}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedKeys(value ? [{ 
                value,
                operator: searchTypes[dataIndex] || 'eq'
              }] : []);
            }}
            onPressEnter={() => handleSearchConfirm(dataIndex, selectedKeys, confirm)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearchConfirm(dataIndex, selectedKeys, confirm)}
              size="small"
              style={{ width: 80 }}
            >
              查询
            </Button>
            <Button
              onClick={() => handleReset(dataIndex, clearFilters, confirm)}
              size="small"
              style={{ width: 80 }}
            >
              重置
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      // 前端筛选逻辑（可选，如果后端已处理可以移除）
      const filterValue = filters[dataIndex]?.value;
      if (!filterValue) return true;
      
      const operator = filters[dataIndex]?.operator || 'eq';
      const recordValue = record[dataIndex];
      
      switch (operator) {
        case 'eq': return String(recordValue) === String(filterValue);
        case 'like': return String(recordValue).includes(filterValue);
        case 'gt': return Number(recordValue) > Number(filterValue);
        case 'lt': return Number(recordValue) < Number(filterValue);
        case 'ne': return String(recordValue) !== String(filterValue);
        default: return true;
      }
    },
  });

  // 处理列配置
  const getTableColumns = () => {
    if (!columns) return [actionColumn];

    return [
      ...columns
        .filter(col => col.visible !== false)
        .map(col => ({
          ...col,
          ...(col.sorter && {
            sorter: true,
            sortOrder: sorter.field === col.dataIndex ? sorter.order : null,
          }),
          ...(col.filter && getColumnSearchProps(
            col.dataIndex, 
            col.title,
            col.type || 'text'
          )),
          ellipsis: true,
        })),
      actionColumn,
    ];
  };

  return (
    <Table
      columns={getTableColumns()}
      dataSource={rows}
      rowKey="id"
      loading={loading}
      pagination={
        pagination && {
          ...pagination,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          pageSizeOptions: ['10', '20', '50', '100'],
        }
      }
      onChange={onChange}
      locale={{
        emptyText: '请从左侧选择数据视图',
      }}
    />
  );
};

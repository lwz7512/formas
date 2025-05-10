// components/column-manager.jsx

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Table, Form, Input, Select, Switch, Button, Popover, ColorPicker, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const { Option } = Select;

// 可拖拽行组件
const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });
  
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

// 可编辑单元格组件
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <Row {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType = 'text',
  options,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title}必填` }]}
      >
        {inputType === 'select' ? (
          <Select 
            ref={inputRef} 
            onBlur={save}
            style={{ width: '100%' }}
          >
            {options?.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  
  return <td {...restProps}>{childNode}</td>;
};

// 条件格式设置弹窗
const ConditionalFormattingPopover = ({ record, onChange }) => {
  const [form] = Form.useForm();
  
  const handleSave = () => {
    form.validateFields().then(values => {
      onChange({
        ...record,
        conditionalFormatting: values
      });
    });
  };

  return (
    <Popover
      title="条件格式设置"
      content={
        <Form form={form} initialValues={record.conditionalFormatting || {}}>
          <Form.Item name="enabled" label="启用" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="field" label="条件字段">
            <Select placeholder="选择字段">
              <Option value="value">当前值</Option>
              <Option value="status">状态</Option>
            </Select>
          </Form.Item>
          <Form.Item name="operator" label="条件">
            <Select placeholder="选择条件">
              <Option value=">">大于</Option>
              <Option value="<">小于</Option>
              <Option value="==">等于</Option>
            </Select>
          </Form.Item>
          <Form.Item name="value" label="比较值">
            <Input />
          </Form.Item>
          <Form.Item name="color" label="颜色">
            <ColorPicker />
          </Form.Item>
          <Button type="primary" onClick={handleSave}>保存</Button>
        </Form>
      }
      trigger="click"
    >
      <Button size="small">设置</Button>
    </Popover>
  );
};

// 主组件
const ViewDesignerColumnManager = ({ 
  dataSource: initialData,
  fieldOptions,
  onColumnsChange,
  onSelectedColumnsChange
}) => {
  const [dataSource, setDataSource] = useState(initialData || []);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  // 初始化数据
  useEffect(() => {
    setDataSource(initialData || []);
    if (initialData) {
      const selectedKeys = initialData
        .filter(col => col.visible !== false)
        .map(col => col.dataIndex);
      setSelectedRowKeys(selectedKeys);
    }
  }, [initialData]);

  // 拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  // 处理拖拽排序
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.dataIndex === active.id);
        const overIndex = prev.findIndex((i) => i.dataIndex === over?.id);
        const newData = arrayMove(prev, activeIndex, overIndex);
        onColumnsChange?.(newData);
        return newData;
      });
    }
  };

  // 保存单元格编辑
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.dataIndex === item.dataIndex);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    onColumnsChange?.(newData);
    updateSelectedColumns(newData);
  };

  // 更新选中列
  const updateSelectedColumns = (data) => {
    const selectedRows = data.filter(item => 
      selectedRowKeys.includes(item.dataIndex)
    );
    onSelectedColumnsChange?.(selectedRows);
  };

  // 行选择变化
  const handleRowSelectionChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    onSelectedColumnsChange?.(rows);
  };

  // 列定义
  const columns = [
    {
      key: 'sort',
      width: 50,
      render: () => <MenuOutlined style={{ cursor: 'move' }} />,
    },
    {
      title: '列名',
      dataIndex: 'dataIndex',
      key: 'dataIndex',
      editable: true,
      width: 150,
    },
    {
      title: '显示名称',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      width: 150,
    },
    {
      title: '字段类型',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => (
        <Select
          value={text}
          style={{ width: '100%' }}
          onChange={(value) => handleSave({ ...record, type: value })}
        >
          <Option value="text">文本</Option>
          <Option value="number">数字</Option>
          <Option value="date">日期</Option>
          <Option value="boolean">布尔值</Option>
        </Select>
      ),
    },
    {
      title: '是否显示',
      dataIndex: 'visible',
      key: 'visible',
      render: (text, record) => (
        <Switch
          checked={text !== false}
          onChange={(checked) => {
            const newRecord = { ...record, visible: checked };
            handleSave(newRecord);
            
            // 更新选中行
            if (checked) {
              setSelectedRowKeys(prev => [...prev, record.dataIndex]);
            } else {
              setSelectedRowKeys(prev => prev.filter(key => key !== record.dataIndex));
            }
          }}
        />
      ),
    },
    {
      title: '宽度',
      dataIndex: 'width',
      key: 'width',
      editable: true,
      width: 100,
      render: (text, record) => (
        <Input 
          value={text} 
          onChange={(e) => handleSave({ ...record, width: e.target.value })}
          suffix="px"
        />
      ),
    },
    {
      title: '对齐方式',
      dataIndex: 'align',
      key: 'align',
      render: (text, record) => (
        <Select
          value={text || 'left'}
          style={{ width: '100%' }}
          onChange={(value) => handleSave({ ...record, align: value })}
        >
          <Option value="left">左对齐</Option>
          <Option value="center">居中</Option>
          <Option value="right">右对齐</Option>
        </Select>
      ),
    },
    {
      title: '条件格式',
      dataIndex: 'conditionalFormatting',
      key: 'conditionalFormatting',
      render: (text, record) => (
        <ConditionalFormattingPopover 
          record={record} 
          onChange={(newRecord) => handleSave(newRecord)}
        />
      ),
    },
    {
      title: '固定列',
      dataIndex: 'fixed',
      key: 'fixed',
      render: (text, record) => (
        <Select
          value={text}
          style={{ width: '100%' }}
          onChange={(value) => handleSave({ ...record, fixed: value })}
          allowClear
        >
          <Option value="left">左侧固定</Option>
          <Option value="right">右侧固定</Option>
        </Select>
      ),
    },
    {
      title: '可排序',
      dataIndex: 'sorter',
      key: 'sorter',
      render: (text, record) => (
        <Switch
          checked={text}
          onChange={(checked) => handleSave({ ...record, sorter: checked })}
        />
      ),
    },
    {
      title: '可筛选',
      dataIndex: 'filter',
      key: 'filter',
      render: (text, record) => (
        <Switch
          checked={text}
          onChange={(checked) => handleSave({ ...record, filter: checked })}
        />
      ),
    },
  ];

  // 表格组件配置
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectionChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={dataSource.map((i) => i.dataIndex)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={components}
          rowKey="dataIndex"
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ x: 'max-content' }}
          bordered
          size="small"
          style={{ marginBottom: 16 }}
        />
      </SortableContext>
    </DndContext>
  );
};

export default ViewDesignerColumnManager;

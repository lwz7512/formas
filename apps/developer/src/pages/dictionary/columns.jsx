import { useState, useEffect } from 'react';

import { Form, Space, Button, Typography, Popconfirm } from 'antd';

/**
 * mocke data for table
 */
const originData = Array.from({
  length: 100,
}).map((_, i) => ({
  key: i.toString(),
  category: 'Employee',
  label: `Edward ${i}`,
  value: `London Park no. ${i}`,
  sequence: `${i}`,
}));

export const useEditableColumns = list => {
  const [form] = Form.useForm();

  const [data, setData] = useState([], form);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    if (!list) return;
    setData(list);
  }, [list]);

  const isEditing = record => record.key === editingKey;

  const saveRowHandler = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const cancelChangeHandler = () => {
    setEditingKey('');
  };

  const deleteRowHandler = () => {
    console.log(`## row deleted!`);
  };

  const editRowHandler = record => {
    form.setFieldsValue({
      category: '',
      label: '',
      value: '',
      sequence: 0,
      ...record,
    });
    setEditingKey(record.key);
  };

  const editableColumns = [
    {
      title: 'Categroy',
      dataIndex: 'category',
      width: '25%',
      editable: true,
    },
    {
      title: 'Label',
      dataIndex: 'label',
      width: '15%',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '20%',
      editable: true,
    },
    {
      title: 'Sequence',
      dataIndex: 'sequence',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => saveRowHandler(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link
              onClick={cancelChangeHandler}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => editRowHandler(record)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Edit
            </Typography.Link>
            <Popconfirm title="Sure to Delete?" onConfirm={deleteRowHandler}>
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = editableColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'sequence' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return {
    data,
    form,
    mergedColumns,
    isEditing,
    saveRowHandler,
    cancelChangeHandler,
  };
};

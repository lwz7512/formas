import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Popconfirm, Typography } from 'antd';

import { FORM_DEFINE_PATH } from '@/constants';
import { removeFormDefine, updateFormDefine } from '@/hooks/api-form';

/**
 * Manage form CRUD operations
 * @returns
 */
export const useEditableColumns = (refreshForms, moduleId) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openFormDesigner = key => {
    navigate(`${FORM_DEFINE_PATH}/designer?formid=${key}`);
  };

  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.key === editingKey;

  const editRowHandler = record => {
    form.setFieldsValue({
      moduleId: '',
      title: '',
      note: '',
      sequence: 0,
      ...record, // reset existing fields
    });
    setEditingKey(record.key);
  };

  const deleteRowHandler = async record => {
    await removeFormDefine(record.key);
    await refreshForms(moduleId);
  };

  const updateFormRowHandler = async key => {
    const row = await form.validateFields();
    // console.log(row);
    setEditingKey(''); // close edit state
    await updateFormDefine({ key, ...row });
    await refreshForms(moduleId);
  };

  const cancelChangeHandler = () => {
    setEditingKey('');
  };

  const editableColumns = [
    {
      title: 'Form Name',
      dataIndex: 'title',
      key: 'title',
      editable: true,
    },
    // {
    //   title: 'Module ID',
    //   dataIndex: 'moduleId',
    //   key: 'moduleId',
    //   width: '20%',
    // },
    {
      title: 'Seqence',
      dataIndex: 'sequence',
      key: 'sequence',
      editable: true,
      width: '4%',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'title',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'actions',
      width: '30%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span data-key={record.key}>
            <Typography.Link
              onClick={() => updateFormRowHandler(record.key)}
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
          <span data-key={record.key}>
            <Button
              size="small"
              color="primary"
              variant="dashed"
              className="mr-2"
              disabled={editingKey !== ''}
              onClick={() => editRowHandler(record)}
            >
              Edit Form
            </Button>
            <Button
              size="small"
              color="primary"
              variant="dashed"
              className="mr-2"
              disabled={editingKey !== ''}
              onClick={() => openFormDesigner(record.key)}
            >
              Schema
            </Button>
            <Popconfirm
              title="Sure to Delete this form?"
              onConfirm={() => deleteRowHandler(record)}
            >
              <Button
                size="small"
                color="danger"
                variant="dashed"
                disabled={editingKey !== ''}
              >
                Delete
              </Button>
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
      // provide properties for `EditableCell`
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
    form,
    columns: mergedColumns,
  };
};

/**
 * @deprecated
 */
export const dataSource = [
  {
    key: '12345',
    title: 'Form ABC',
    moduleId: '12345',
    sequence: 1,
    note: '10 Downing Street',
  },
  {
    key: '23456',
    title: 'Form DEF',
    moduleId: '23456',
    sequence: 2,
    note: '10 Downing Street',
  },
  {
    key: '34567',
    title: 'Form GHJ',
    moduleId: '34567',
    sequence: 3,
    note: '10 Downing Street',
  },
];

export const columns = [
  {
    title: 'Form Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Module ID',
    dataIndex: 'moduleId',
    key: 'moduleId',
  },
  {
    title: 'Seqence',
    dataIndex: 'sequence',
    key: 'sequence',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'title',
  },
  {
    title: 'Operation',
    dataIndex: 'actions',
    width: '25%',
    render: (_, record) => {
      return (
        <span data-key={record.key}>
          <Button
            size="small"
            color="primary"
            variant="dashed"
            className="mr-2"
            onClick={() => console.log(`open edit panel`)}
          >
            Edit Form
          </Button>
          <Button
            size="small"
            color="primary"
            variant="dashed"
            className="mr-2"
            onClick={() => console.log(`design edit panel`)}
          >
            Design Schema
          </Button>
        </span>
      );
    },
  },
];

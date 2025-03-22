import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from 'antd';

import { FORM_DEFINE_PATH } from '@/constants';
import { removeFormDefine, updateFormDefine } from '@/hooks/api-form';
import { createDataview } from '@/hooks/api-dataview';

import { RowDisplayActions, RowEditActions } from './actions';

const columns4Display = [
  {
    title: 'Form Name',
    dataIndex: 'title',
    key: 'title',
    editable: true,
  },
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
];

/**
 * Manage form CRUD operations
 * @date 2024/12/31
 * @param {string} moduleId - the module id
 * @param {function} refreshForms - refresh the form list
 * @param {function} notificationInstance - the notification callback instance
 * @returns
 */
export const useEditableColumns = (
  moduleId,
  refreshForms,
  notificationInstance
) => {
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

  const createDataviewHandler = async record => {
    notificationInstance.info({
      message: 'Creating dataview...',
    });
    try {
      await createDataview(record);
    } catch (error) {
      notificationInstance.error({
        message: error.message,
      });
      return console.error(error.message);
    }
    notificationInstance.success({
      message: 'Dataview created successfully',
    });
  };

  const editableColumns = [
    ...columns4Display,
    {
      title: 'Operation',
      dataIndex: 'actions',
      width: '30%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <RowDisplayActions
            record={record}
            updateFormRowHandler={updateFormRowHandler}
            cancelChangeHandler={cancelChangeHandler}
          />
        ) : (
          <RowEditActions
            record={record}
            editingKey={editingKey}
            editRowHandler={editRowHandler}
            openFormDesigner={openFormDesigner}
            deleteRowHandler={deleteRowHandler}
            createDataviewHandler={createDataviewHandler}
          />
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

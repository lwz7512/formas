// view-table.jsx
import { useEffect } from 'react';
import { Table, Button, Popconfirm } from 'antd';

import { useViewList, removeDataview } from '@/hooks/api-dataview';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Form',
    dataIndex: 'formId',
    key: 'formId',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
  },
];

/**
 * Data view table component
 * @date 2025/03/23
 *
 * @param {string} moduleId - The tree node(module) ID to load dataviews
 *
 * @returns
 */
export const DVTable = ({ moduleId, notificationInstance }) => {
  const { views, refreshViews } = useViewList();

  const deleteRowHandler = async record => {
    notificationInstance.info({ message: 'Deleting Data View...' });
    await removeDataview(record.key);
    await refreshViews(moduleId);
    notificationInstance.success({ message: 'Data View deleted successfully' });
  };

  const operationColumn = {
    title: 'Operation',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, record) => {
      return (
        <Popconfirm
          title="Sure to Delete this Data View?"
          onConfirm={() => deleteRowHandler(record)}
        >
          <Button size="small" color="danger" variant="dashed">
            Delete
          </Button>
        </Popconfirm>
      );
    },
  };

  useEffect(() => {
    refreshViews(moduleId);
  }, [refreshViews, moduleId]);

  return <Table dataSource={views} columns={[...columns, operationColumn]} />;
};

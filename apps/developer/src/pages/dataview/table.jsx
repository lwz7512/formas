import { useEffect } from 'react';
import { Table } from 'antd';

import { useViewList } from '@/hooks/api-dataview';

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
export const DVTable = ({ moduleId }) => {
  const { views, refreshViews } = useViewList();

  useEffect(() => {
    refreshViews(moduleId);
  }, [refreshViews, moduleId]);

  return <Table dataSource={views} columns={columns} />;
};

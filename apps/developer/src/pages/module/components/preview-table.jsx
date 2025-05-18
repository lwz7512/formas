// components/preview-table.jsx
import React, { useMemo } from 'react';
import { Table, Empty } from 'antd';

export const PreviewDataTable = ({ 
  columnsConfig, 
  selectedColumns, 
  data, 
  loading 
}) => {
  const processedColumns = useMemo(() => {
    return columnsConfig
      .filter(col => selectedColumns.some(sc => sc.dataIndex === col.dataIndex))
      .map(col => ({
        key: col.dataIndex,
        title: col.title,
        dataIndex: col.dataIndex,
        width: col.width,
        fixed: col.fixed,
        ellipsis: true,
      }));
  }, [columnsConfig, selectedColumns]);

  return (
    <div style={{ padding: 16, height: '100%' }}>
      {processedColumns.length > 0 ? (
        <Table
          size="middle"
          columns={processedColumns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 'calc(60vh - 180px)' }}
          rowKey="id"
        />
      ) : (
        <Empty 
          description="请先在列配置中选择要显示的列" 
          style={{ marginTop: 80 }}
        />
      )}
    </div>
  );
};

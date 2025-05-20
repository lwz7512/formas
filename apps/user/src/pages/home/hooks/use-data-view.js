// hooks/use-data-view.js
import { useState } from 'react';
import {
  fetchDataviewDetail,
  fetchFormSchema,
  fetchDataviewInstanceListByFilter,
} from '@/api/dataview-instance';

export const useDataView = () => {
  const [dataview, setDataview] = useState(null);
  const [rows, setRows] = useState([]);
  const [schema, setSchema] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({}); // 新增filters状态

  const treeNodeSelectHandler = async (_, { node }) => {
    if (node.type === 'dataview') {
      setLoading(true);
      try {
        // 获取数据视图详情
        const { data: dataviewDetail } = await fetchDataviewDetail(node.value);
        setDataview(dataviewDetail);

        // 获取表单schema
        const {
          data: { schema },
        } = await fetchFormSchema(dataviewDetail.formId);
        setSchema(JSON.parse(schema));

        // 获取第一页数据（重置状态）
        await refreshFormInstanceTable(
          node.value,
          1,
          pagination.pageSize,
          {}, // 重置filters
          {} // 重置sorter
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const refreshFormInstanceTable = async (
    dataviewId,
    current = pagination.current,
    pageSize = pagination.pageSize,
    newFilters = filters, // 默认使用当前filters
    newSorter = sorter // 默认使用当前sorter
  ) => {
    setLoading(true);
    try {
      // 更新状态
      setFilters(newFilters);
      setSorter(newSorter);

      // 转换筛选条件
      const searchs = Object.entries(newFilters)
        .filter(([_, value]) => value?.value)
        .map(([column, { value, operator = 'eq' }]) => ({
          column,
          op: operator,
          value: operator === 'like' ? `%${value}%` : value,
        }));

      // 转换排序参数
      const orders = [];
      if (newSorter.field && newSorter.order) {
        orders.push({
          column: newSorter.field,
          dir: newSorter.order === 'ascend' ? 'asc' : 'desc',
        });
      }

      const response = await fetchDataviewInstanceListByFilter(
        dataviewId,
        current,
        pageSize,
        orders,
        searchs
      );

      setRows(response.datas);
      setPagination(prev => ({
        ...prev,
        current,
        pageSize,
        total: response.totalNum || 0,
      }));
    } finally {
      setLoading(false);
    }
  };

  // 重置方法
  const resetFilters = () => {
    setFilters({});
    return {}; // 返回空filters
  };

  return {
    dataview,
    rows,
    schema,
    pagination,
    loading,
    sorter,
    filters, // 暴露filters
    treeNodeSelectHandler,
    refreshTable: refreshFormInstanceTable,
    resetFilters, // 暴露重置方法
  };
};

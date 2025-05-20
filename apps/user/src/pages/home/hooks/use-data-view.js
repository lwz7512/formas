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
  const [sorter, setSorter] = useState({}); // 新增排序状态

  const treeNodeSelectHandler = async (_, { node }) => {
    if (node.type === 'dataview') {
      setLoading(true);
      try {
        // 获取数据视图详情
        const { data: dataviewDetail } = await fetchDataviewDetail(node.value);
        setDataview(dataviewDetail);
        console.log(dataviewDetail);

        // 获取表单schema
        const {
          data: { schema },
        } = await fetchFormSchema(dataviewDetail.formId);
        setSchema(JSON.parse(schema));

        // 获取第一页数据（重置排序状态）
        await refreshFormInstanceTable(node.value, 1, pagination.pageSize, [], {});
      } finally {
        setLoading(false);
      }
    }
  };

  const refreshFormInstanceTable = async (
    dataviewId,
    current = pagination.current,
    pageSize = pagination.pageSize,
    filters = {},
    sorterParams = {}
  ) => {
    setLoading(true);
    try {
      // 转换筛选条件为API需要的格式
      const searchs = Object.entries(filters)
        .filter(([_, value]) => value?.value)
        .map(([column, { value, operator }]) => ({
          column,
          op: operator,
          value: operator === 'like' ? `%${value}%` : value
        }));
  
      // 转换排序参数
      const orders = [];
      if (sorterParams.field && sorterParams.order) {
        orders.push({
          column: sorterParams.field,
          dir: sorterParams.order === 'ascend' ? 'asc' : 'desc'
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
      setSorter(sorterParams);
    } finally {
      setLoading(false);
    }
  };

  return {
    dataview,
    rows,
    schema,
    pagination,
    loading,
    sorter,
    treeNodeSelectHandler,
    refreshTable: refreshFormInstanceTable,
  };
};

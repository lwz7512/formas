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
  /* 存储结构示例
    const filters = {
      name: { value: "项目", operator: "like" },
      status: { value: 1, operator: "eq" }
    };
  */
  const [filters, setFilters] = useState({}); // 可以存储多个过滤条件

  // 添加过滤条件并刷新
  const addFilterAndRefresh = async (field, value, operator = 'eq') => {
    console.log('addFilterAndRefresh', field, value, operator);
    if (!dataview?.id) return;

    const newFilters = { ...filters, [field]: { value, operator } };
    setFilters(newFilters);
    await refreshWithFilters(newFilters);
  };

  // 移除过滤条件并刷新
  const removeFilterAndRefresh = async field => {
    console.log('removeFilterAndRefresh', field);
    if (!dataview?.id) return;

    const newFilters = { ...filters };
    delete newFilters[field];
    setFilters(newFilters);
    await refreshWithFilters(newFilters);
  };

  // 统一刷新方法
  const refreshWithFilters = async (
    currentFilters = filters,
    sorterParams = sorter,
    pageInfo = pagination
  ) => {
    // 加强空值检查
    if (!dataview?.id || !pageInfo) {
      console.warn('刷新数据被跳过：缺少必要参数');
      return;
    }

    setLoading(true);
    try {
      console.log('refreshWithFilters', currentFilters);
      const searchs = toAPISearchParams(currentFilters);
      console.log('refreshWithFilters', searchs);
      const orders = toAPIOrderParams(sorterParams);

      // Only make the API call if we have the minimum required data
      const response = await fetchDataviewInstanceListByFilter(
        dataview.id,
        pageInfo.current,
        pageInfo.pageSize,
        orders,
        searchs
      );

      // 检查响应数据
      if (!response?.datas) {
        throw new Error('无效的表格数据响应');
      }

      setRows(response.datas || []);
      setPagination(prev => ({
        ...prev,
        total: response.totalNum || 0,
      }));
    } catch (error) {
      console.error('刷新表格数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 转换过滤条件为API格式
  const toAPISearchParams = (filters) => {
    return Object.entries(filters)
      .filter(([_, value]) => value && value.value !== undefined)
      .map(([column, filterObj]) => {
        // 统一处理value格式
        const value = typeof filterObj.value === 'object' 
          ? filterObj.value.value 
          : filterObj.value;
        
        return {
          column,
          op: filterObj.operator || 'eq',
          value: filterObj.operator === 'like' ? `%${value}%` : value
        };
      });
  };

  // 转换排序参数为API格式
  const toAPIOrderParams = sorter => {
    if (!sorter?.field) return [];
    return [
      {
        column: sorter.field,
        dir: sorter.order === 'ascend' ? 'asc' : 'desc',
      },
    ];
  };

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
    addFilter: addFilterAndRefresh,
    removeFilter: removeFilterAndRefresh,
    treeNodeSelectHandler,
    refreshTable: refreshFormInstanceTable,
    resetFilters, // 暴露重置方法
  };
};

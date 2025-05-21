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

  // 转换过滤条件为API格式
  const toAPISearchParams = filters => {
    return Object.entries(filters)
      .filter(([_, value]) => value?.value)
      .map(([column, { value, operator = 'eq' }]) => ({
        column,
        op: operator,
        value: operator === 'like' ? `%${value}%` : value,
      }));
  };

  // 添加过滤条件并刷新
  const addFilterAndRefresh = async (field, value, operator = 'eq') => {
    if (!dataview?.id) return;

    const newFilters = { ...filters, [field]: { value, operator } };
    setFilters(newFilters);
    await refreshWithFilters(newFilters);
  };

  // 移除过滤条件并刷新
  const removeFilterAndRefresh = async field => {
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
      const searchs = toAPISearchParams(currentFilters);
      const orders = toAPIOrderParams(sorterParams);

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
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        total: response.totalNum || 0,
      }));
    } catch (error) {
      console.error('刷新表格数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const treeNodeSelectHandler = async (_, { node }) => {
    if (node.type === 'dataview') {
      setLoading(true);
      try {
        // 1. 获取数据视图详情
        const { data: dataviewDetail } = await fetchDataviewDetail(node.value);

        // 添加空值检查
        if (!dataviewDetail) {
          console.error('获取数据视图详情失败');
          return;
        }

        setDataview(dataviewDetail);

        // 2. 获取表单schema（添加formId检查）
        if (!dataviewDetail.formId) {
          console.error('数据视图缺少formId');
          return;
        }

        const { data: formSchemaResponse } = await fetchFormSchema(
          dataviewDetail.formId
        );

        // 检查schema响应
        if (!formSchemaResponse?.schema) {
          console.error('获取表单schema失败');
          return;
        }

        setSchema(JSON.parse(formSchemaResponse.schema));

        // 3. 重置状态并刷新数据
        setFilters({});
        setSorter({});

        if (dataviewDetail.id) {
          await refreshWithFilters(
            {},
            {},
            { current: 1, pageSize: pagination.pageSize }
          );
        }
      } catch (error) {
        console.error('处理树节点选择时出错:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    dataview,
    rows,
    schema,
    pagination,
    loading,
    sorter,
    filters,
    addFilter: addFilterAndRefresh,
    removeFilter: removeFilterAndRefresh,
    refreshTable: refreshWithFilters,
    treeNodeSelectHandler,
  };
};

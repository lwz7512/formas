import { useState, useEffect } from 'react';
import { fetchDictionaryList } from '@/api/dictionary';

export const useDictionaryList = (initialParams = {}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    ...initialParams
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState([]);

  const fetchList = async (params = {}) => {
    setLoading(true);
    try {
      const requestParams = {
        currPage: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize,
        searchs: params.searchs || searchParams, // 优先使用传入的搜索条件
        ...params
      };

      const result = await fetchDictionaryList(requestParams);
      
      setData(result.datas || []);
      setPagination(prev => ({
        ...prev,
        total: result.totalNum || 0,
        current: result.currPage || requestParams.currPage,
        pageSize: result.pageSize || requestParams.pageSize
      }));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (current, pageSize) => {
    fetchList({ current, pageSize });
  };

  // 修改setSearch函数，直接传递搜索参数
  const setSearch = (column, value) => {
    const newSearchParams = value ? 
      [{ column, op: 'like', value }] : 
      [];
    
    // 先更新状态
    setSearchParams(newSearchParams);
    // 然后直接使用新的搜索参数进行查询
    return fetchList({ 
      current: 1,
      searchs: newSearchParams 
    });
  };

  useEffect(() => {
    fetchList({
      current: pagination.current,
      pageSize: pagination.pageSize
    });
  }, []);

  return {
    data,
    pagination,
    loading,
    error,
    fetchList,
    handlePageChange,
    setSearch
  };
};
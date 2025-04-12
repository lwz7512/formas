import { useState, useEffect } from 'react';
import { fetchDataSourceList } from '../../../api/data-source';

export const useDataSourceList = (initialParams = {}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    ...initialParams
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = async (params = {}) => {
    setLoading(true);
    try {
      const result = await fetchDataSourceList({
        currPage: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize,
        ...params
      });

      console.log('API Response:', result); // 调试日志

      setData(result.datas || []);
      setPagination(prev => ({
        ...prev,
        total: result.totalNum, // 直接使用API返回的totalNum
        current: result.currPage || prev.current,
        pageSize: result.pageSize || prev.pageSize
      }));
    } catch (err) {
      setError(err);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (current, pageSize) => {
    fetchList({ current, pageSize });
  };

  useEffect(() => {
    fetchList(initialParams);
  }, []);

  return {
    data,
    pagination,
    loading,
    error,
    fetchList,
    handlePageChange
  };
};
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

  const fetchList = async (params = {}) => {
    setLoading(true);
    try {
      // 确保请求参数包含分页信息，使用与API一致的参数名
      const requestParams = {
        currPage: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize,
        ...params
      };

      const result = await fetchDictionaryList({
        currPage: requestParams.currPage,
        pageSize: requestParams.pageSize
      });
      
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

  // 分页变化处理器
  const handlePageChange = (current, pageSize) => {
    fetchList({ current, pageSize });
  };

  // 初始加载（确保传递正确的参数名）
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
    handlePageChange
  };
};
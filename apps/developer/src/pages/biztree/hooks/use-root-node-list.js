// hooks/use-root-node-list.js
import { useState, useEffect, useCallback } from 'react';
import { fetchRootNodes } from '@/api/biztree';

export const useRootNodeList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const result = await fetchRootNodes({
        page: params.current || pagination.current,
        size: params.pageSize || pagination.pageSize,
      });
      
      setData(result.datas);
      setPagination({
        ...pagination,
        ...params,
        total: result.total,
      });
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange = (newPagination) => {
    fetchData(newPagination);
  };

  return {
    data,
    pagination,
    loading,
    handleTableChange,
    refresh: fetchData,
  };
};
import { useState, useEffect, useCallback } from 'react';

const useFetchData = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 将参数对象转换为查询字符串
      const queryString = new URLSearchParams(params).toString();
      // 拼接完整的请求 URL
      const requestUrl = `${url}?${queryString}`;
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};

export default useFetchData;

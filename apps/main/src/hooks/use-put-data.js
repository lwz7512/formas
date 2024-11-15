import { useCallback, useEffect, useState } from 'react';

/**
 * put data hook
 * @param {string} url
 * @param {Object} params - The parameters to be sent with the PUT request
 * @returns
 */
const usePutData = (url, params) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const putData = useCallback(async () => {
    try {
      // 从localStorage获取token
      const token = localStorage.getItem('formas.jwt');
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(params),
      });
      const json = await response.json();

      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    putData();
  }, [url, params]);

  return { data, error, loading };
};

export default usePutData;

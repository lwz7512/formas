import { useCallback, useEffect, useState } from 'react';

/**
 * post data hook
 * @param {string} url
 * @param {Object} params - The parameters to be sent with the POST request
 * @returns
 */
const usePostData = (url, params) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const postData = useCallback(async () => {
    try {
      // 从localStorage获取token
      const token = localStorage.getItem('formas.jwt');
      const response = await fetch(url, {
        method: 'POST',
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
    postData();
  }, [url, params]);

  return { data, error, loading };
};

export default usePostData;

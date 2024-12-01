import { useCallback, useEffect, useState } from 'react';

/**
 * General post request function using browser vanilla `fetch` API
 *
 * @param {string} url request url string
 * @param {Object} params request parameters in object format
 * @param {Function} onSuccess success callback
 * @param {Funcion} onError failure callback
 * @param {Function} onFinish finally callback
 */
export const vanillaPutData = async (
  url,
  params,
  onSuccess,
  onError,
  onFinish
) => {
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
    onSuccess && onSuccess(json);
    // return response:
    return json;
  } catch (error) {
    onError && onError(error);
  } finally {
    onFinish && onFinish();
  }
};

/**
 * put data hook
 * @param {string} url
 * @param {Object} params - The parameters to be sent with the PUT request
 * @returns
 */
export const usePutData = (url, params) => {
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

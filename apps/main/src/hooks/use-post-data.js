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
export const vanillaPostData = async (
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
      method: 'POST',
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
 * post data hook, trigger request manually!
 *
 * @param {string} url
 * @param {Object} params - The parameters to be sent with the POST request
 * @returns
 */
export const usePostData = (url, params) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  // not sending request by default
  const [loading, setLoading] = useState(false);

  const postData = useCallback(async () => {
    const onFinish = () => setLoading(false);
    return await vanillaPostData(url, params, setData, setError, onFinish);
  }, [url, params]);

  const trigger = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    return await postData();
  }, [loading, postData]);

  return { data, error, loading, trigger };
};

import { useEffect, useRef } from 'react';
import { useAsyncFn } from 'react-use';

/**
 * General post request function using browser vanilla `fetch` API
 *
 * @param {string} url request url string
 * @param {Object} params request parameters in object format
 * @param {Function} onSuccess success callback
 * @param {Funcion} onError failure callback
 * @param {Function} onFinish finally callback
 */
export const vanillaGetData = async (
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
      method: 'GET',
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
 * Simple data fetching hook
 * @param {string} url request url for fetching something
 * @returns
 */
export const useFetchData = url => {
  const [state, doFetch] = useAsyncFn(async (url, params) => {
    return await vanillaGetData(url, params);
  }, []);
  // prevent repetitive request!
  const requestLocker = useRef(false);

  const { loading, error, value } = state;

  useEffect(() => {
    if (!url) return console.warn(`## NO url provided for data fetching!`);
    if (requestLocker.current) return;
    requestLocker.current = true;
    doFetch(url).then(() => {
      requestLocker.current = false;
    });
  }, [doFetch, url]);

  return {
    error,
    loading,
    ...value,
    refresh: () => doFetch(url),
  };
};

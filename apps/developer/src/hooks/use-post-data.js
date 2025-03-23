import { useCallback, useEffect, useState, useRef } from 'react';
import { useAsyncFn } from 'react-use';

/**
 * General post request function using browser vanilla `fetch` API
 *
 * @param {string} url request url string
 * @param {Object|undefined} params request parameters in object format
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
      body: JSON.stringify(params || {}),
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
 * Sent post request
 *
 * @param {string} url post url
 * @param {object} params post payload
 * @returns {object} results
 */
export const useAsyncPost = () => {
  const [state, doFetch] = useAsyncFn(async (url, params) => {
    const onError = err => console.error(err);
    return await vanillaPostData(url, params, undefined, onError);
  }, []); // do not add deps here!!

  const { loading, error, value } = state;

  return {
    error,
    loading,
    ...value,
    doPost: doFetch,
  };
};

/**
 * post data hook, trigger request manually!
 * to expose `postData` function, status of request, and result of request.
 * @param {string} url post url, optional
 * @param {object} params request params object, optional
 * @returns
 */
export const usePostData = (url = '', params = {}) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  // not sending request by default
  const [loading, setLoading] = useState(false);

  // request repetition locker
  const requestLocker = useRef(false);

  // update request url & payload
  const urlRef = useRef('');
  const paramsRef = useRef(null);
  useEffect(() => {
    urlRef.current = url;
    paramsRef.current = params;
  }, [url, params]);

  /**
   * Memorized `post` method with `url` & `params` required
   */
  const mPostData = useCallback(async (url, params) => {
    if (requestLocker.current) return;

    setLoading(true);
    requestLocker.current = true;

    const onFinish = () => {
      setLoading(false);
      requestLocker.current = false;
    };
    return await vanillaPostData(url, params, setData, setError, onFinish);
  }, []);

  /**
   * Memorized `post` method without `url` & `params`
   */
  const mTrigger = useCallback(async () => {
    const url = urlRef.current;
    const params = paramsRef.current;
    if (!url || !params) return;
    return await mPostData(url, params);
  }, [mPostData]);

  return {
    data,
    error,
    loading,
    trigger: mTrigger,
    postData: mPostData,
  };
};

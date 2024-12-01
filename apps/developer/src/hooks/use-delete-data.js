import { useCallback, useEffect, useState } from 'react';

/**
 * General delete request function using browser vanilla `fetch` API
 *
 * @param {string} url request url string
 * @param {Object} params request parameters in object format
 * @param {Function} onSuccess success callback
 * @param {Funcion} onError failure callback
 * @param {Function} onFinish finally callback
 */
export const vanillaDeleteData = async (
  url,
  params,
  onSuccess,
  onError,
  onFinish
) => {
  try {
    // 将参数对象转换为查询字符串
    const queryString = new URLSearchParams(params).toString();
    // 从localStorage获取token
    const token = localStorage.getItem('formas.jwt');
    // 设置请求的配置对象，包括headers
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // 确保内容类型为JSON
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await fetch(`${url}?${queryString}`, config);
    const json = await response.json();
    onSuccess && onSuccess(json);
    return json;
  } catch (error) {
    onError && onError(error);
  } finally {
    onFinish && onFinish();
  }
};

/**
 * @deprecated NO LOGNER IN USE
 * @param {string} url
 * @param {object} params
 * @returns
 */
export const useDeleteData = (url, params) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteData = useCallback(async () => {
    try {
      // 将参数对象转换为查询字符串
      const queryString = new URLSearchParams(params).toString();

      // 从localStorage获取token
      const token = localStorage.getItem('formas.jwt');
      // 设置请求的配置对象，包括headers
      const config = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // 确保内容类型为JSON
          Authorization: 'Bearer ' + token,
        },
      };

      const response = await fetch(`${url}?${queryString}`, config);
      setData(
        response.ok ? { message: 'Resource deleted successfully' } : null
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  // useEffect(() => {
  //   deleteData();
  // }, [url, params]);

  return { data, error, loading };
};

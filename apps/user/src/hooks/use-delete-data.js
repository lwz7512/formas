import { useState } from 'react';
import { useAsyncFn } from 'react-use';

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
 * @param {string} url
 * @param {object} params
 * @returns
 */
export const useDeleteData = () => {
  const [data, setData] = useState();

  const [state, doFetch] = useAsyncFn(async (url, params = {}) => {
    const result = await vanillaDeleteData(url, params);
    const { datas } = result;
    if (!datas) {
      console.warn(`## No result for dictionary definition!`);
      return null;
    }
    setData(datas);
    return datas;
  }, []);

  return { data, ...state, doDelete: doFetch };
};

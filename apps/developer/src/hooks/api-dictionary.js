import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';

import { SERVICE_GATE_API as host } from '@/config';
import { vanillaPutData, vanillaDeleteData, vanillaPostData } from '.';

/**
 * 查询数据字典列表
 * @returns {Promise} dictinary list
 */
export const fetchDictionaryList = async (orderColumn = 'category') => {
  const params = {
    currPage: 1,
    pageSize: 100,
    orders: [
      {
        column: orderColumn,
        dir: 'asc',
      },
    ],
    searchs: [],
  };
  const result = await vanillaPostData(
    `${host}/api/sys/dictionaries/filter`,
    params
  );
  return result;
};

/**
 * 创建数据字典
 * @param {{category: string, label: string, value: string, sequence:string}} item
 */
export const createDictionaryItem = async item => {
  const { category, label, value, sequence } = item;
  const result = await vanillaPostData(`${host}/api/sys/dictionaries`, {
    category,
    name: label,
    value,
    seq: sequence,
  });
  return result;
};

/**
 * 修改数据字典
 */
export const updateDictionaryItem = async item => {
  const result = await vanillaPutData(
    `${host}/api/sys/dictionaries/${item.key}`,
    {
      category: item.category,
      name: item.label,
      seq: item.sequence,
      value: item.value,
    }
  );
  return result;
};

/**
 * 删除数据字典
 * @param {string} key dictionary id
 */
export const removeDictionary = async key => {
  const result = await vanillaDeleteData(`${host}/api/sys/dictionaries/${key}`);
  return result;
};

/**
 * Convert dict item from DB to front-end structure
 * @param {*} dictItems
 * @returns
 */
const rowItems = dictItems =>
  dictItems.map(item => ({
    key: item.id,
    category: item.category,
    label: item.name,
    value: item.value,
    sequence: item.seq,
  }));

/**
 * Refreshable dictinary list hook
 * @returns
 */
export const useDictionaryList = () => {
  const [state, doFetch] = useAsyncFn(async () => {
    const result = await fetchDictionaryList();
    const { datas } = result;
    if (!datas) {
      console.warn(`## No result for dictionary definition!`);
      return null;
    }
    return rowItems(datas);
  }, []);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return {
    loading: state.loading,
    dicItems: state.value,
    memRefreshDictionaryItems: doFetch,
  };
};

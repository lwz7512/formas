import { useState, useCallback, useEffect } from 'react';

import { vanillaPutData, vanillaDeleteData, vanillaPostData } from '.';

import { SERVICE_HOST_POST as host } from '@/config';

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
 * Refreshable dictinary list hook
 * @returns
 */
export const useDictionaryList = () => {
  const [dicItems, setDicItems] = useState([]);
  /**
   * Memorized fecthing method to avoid dead loop fetching!
   */
  const memRefreshDictionaryItems = useCallback(async () => {
    const result = await fetchDictionaryList();
    const { datas } = result;
    if (!datas) return console.warn(`## no data for dictionarly!`);
    const rowItems = datas.map(item => ({
      key: item.id,
      category: item.category,
      label: item.name,
      value: item.value,
      sequence: item.seq,
    }));
    setDicItems(rowItems);
  }, []);

  useEffect(() => {
    memRefreshDictionaryItems();
  }, [memRefreshDictionaryItems]);

  return {
    dicItems,
    memRefreshDictionaryItems,
  };
};

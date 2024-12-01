import { useState, useCallback, useEffect } from 'react';

import {
  useFetchData,
  usePostData,
  usePutData,
  useDeleteData,
  vanillaPostData,
} from '.';

import { SERVICE_HOST_POST as host } from '@/config';

export const useDictionaryList = () => {
  const [dicItems, setDicItems] = useState([]);
  /**
   * Memorized fecthing method to avoid dead loop fetching!
   */
  const memRefreshDictionaryItems = useCallback(async () => {
    const result = await fetchDictionaryList();
    const { datas } = result;
    if (!datas) return console.warn(`## no data for dictionarly!`);
    const rowItems = datas.map((item, i) => ({
      key: i.toString(),
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

/**
 * 查询数据字典列表
 * @param {*} page 当前页
 * @param {*} size 每页记录数
 * @param {*} orders 排序，数组[{'column':'name', 'dir':'asc'},{'column':'title', 'dir':'desc'}]
 * @param {*} searchs 过滤条件，数组[{'column':'name', 'op':'eq', 'value':'系统字典'}]
 *
 */
export const fetchDictionaryList = async () => {
  const params = {
    currPage: 1,
    pageSize: 100,
    orders: [
      {
        column: 'name',
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
 * 查询数据字典
 * @param {*} id
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const useFetchDictionary = id => {
  const { data, error, loading } = useFetchData(
    `${host}/api/sys/dictionaries/${id}`
  );
  return { data, error, loading };
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
export const useModifyDictionary = (id, category, seq, value) => {
  const { data, error, loading } = usePutData(
    `${host}/api/sys/dictionaries/${id}`,
    {
      category: category,
      seq: seq,
      value: value,
    }
  );
  return { data, error, loading };
};

/**
 * 删除数据字典
 */
export const useRemoveDictionary = id => {
  const { data, error, loading } = useDeleteData(
    `${host}/api/sys/dictionaries/${id}`
  );
  return { data, error, loading };
};

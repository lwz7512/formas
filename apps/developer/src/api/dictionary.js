import httpClient from '@/utils/http-client';

/**
 * 查询数据字典列表
 * @param {Object} params 查询参数
 * @param {number} params.current 当前页码
 * @param {number} params.pageSize 每页条数
 * @param {string} params.searchs 查询条件列
 */
export const fetchDictionaryList = async (params) => {
  const response = await httpClient.post('/sys/dictionaries/filter', {
    currPage: params.currPage,
    pageSize: params.pageSize,
    orders: [{ column: 'category', dir: 'asc' }],
    searchs: params.searchs || [] // 确保传递搜索条件
  });
  return response;
};

/**
 * 创建数据字典项
 * @param {Object} item 字典项数据
 */
export const createDictionaryItem = async (item) => {
  const response = await httpClient.post('/sys/dictionaries', {
    category: item.category,
    label: item.label,
    value: item.value,
    sequence: item.sequence
  });
  return response.data;
};

/**
 * 更新数据字典项
 * @param {Object} item 字典项数据
 */
export const updateDictionaryItem = async (item) => {
  const response = await httpClient.put(`/sys/dictionaries/${item.id}`, {
    category: item.category,
    label: item.label,
    value: item.value,
    sequence: item.sequence
  });
  return response.data;
};

/**
 * 删除数据字典项
 * @param {string} id 字典项ID
 */
export const deleteDictionaryItem = async (id) => {
  const response = await httpClient.delete(`/sys/dictionaries/${id}`);
  return response.data;
};

// src/api/presentation.js
import httpClient from '@/utils/http-client';

export const fetchPresentationList = async moduleId => {
  const response = await httpClient.post('/formas/presentations/filter', {
    currPage: 1,
    pageSize: 1000,
    orders: [{ column: 'sequence', dir: 'asc' }],
    searchs: [{ column: 'moduleId', op: 'eq', value: moduleId }],
  });
  return response;
};

export const fetchPresentation = async id => {
  const response = await httpClient.get(`/formas/presentations/${id}`, {});
  return response;
};

// 获取数据呈现下拉树
export const fetchPresentationTree = async () => {
  const response = await httpClient.get('/formas/presentations/module-tree', {});
  return response;
};

export const deletePresentation = async id => {
  const response = await httpClient.delete(`/formas/presentations/${id}`);
  return response.data;
};

/**
 * 更新呈现
 * @param {string} presentationId 呈现ID
 * @param {object} data 呈现数据
 * @param {string} [data.title] 呈现标题
 * @param {string} [data.note] 呈现描述
 * @param {number} [data.sequence] 排序序号
 * @param {number} [data.chartType] 呈现类型
 * @returns {Promise} 更新结果
 */
export const updatePresentation = async (id, data) => {
  return httpClient.put(`/formas/presentations/${id}`, data);
};

export const updatePresentationColumnConfig = async (id, columnConfig) => {
  return httpClient.put(`/formas/presentations/${id}/column-config`, {
    columnConfig: columnConfig,
  });
};

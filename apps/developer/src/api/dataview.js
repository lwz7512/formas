// src/api/dataview.js
import httpClient from '@/utils/http-client';

export const fetchDataviewList = async (moduleId) => {
  const response = await httpClient.post('/formas/dataviews/filter', {
    currPage: 1,
    pageSize: 1000,
    orders: [{ column: 'sequence', dir: 'asc' }],
    searchs: [{ column: 'moduleId', op: 'eq', value: moduleId }]
  });
  return response;
};

// 获取数据视图下拉树
export const fetchDataviewTree = async () => {
  const response = await httpClient.get('/formas/dataviews/module-tree', {
  });
  return response;
};

export const deleteDataview = async id => {
  const response = await httpClient.delete(`/formas/dataviews/${id}`);
  return response.data;
};

/**
 * 更新表单
 * @param {string} formId 表单ID
 * @param {object} formData 表单数据
 * @param {string} [formData.title] 表单标题
 * @param {string} [formData.code] 表单编码
 * @param {string} [formData.note] 表单描述
 * @param {number} [formData.sequence] 排序序号
 * @returns {Promise} 更新结果
 */
export const updateDataview = async (viewId, viewData) => {
  return httpClient.put(`/formas/dataviews/${viewId}`, viewData);
};

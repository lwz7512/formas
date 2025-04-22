// api/form.js
import httpClient from '@/utils/http-client';

/**
 * 获取表单列表
 * @param {string} moduleId 模块ID
 * @returns {Promise} 表单列表
 */
export const fetchFormList = async (moduleId) => {
  const response = await httpClient.post('/formas/forms/filter', {
    currPage: 1,
    pageSize: 1000,
    orders: [{ column: 'sequence', dir: 'asc' }],
    searchs: [{ column: 'moduleId', op: 'eq', value: moduleId }]
  });
  return response;
};

/**
 * 创建新表单
 * @param {object} formData 表单数据
 * @param {string} formData.title 表单标题
 * @param {string} formData.code 表单编码
 * @param {string} formData.description 表单描述
 * @param {number} formData.sequence 排序序号
 * @param {string} formData.moduleId 所属模块ID
 * @returns {Promise} 创建结果
 */
export const createForm = async (formData) => {
  return httpClient.post('/formas/forms', formData);
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
export const updateForm = async (formId, formData) => {
  return httpClient.put(`/formas/forms/${formId}`, formData);
};

/**
 * 删除表单
 * @param {string} formId 表单ID
 * @returns {Promise} 删除结果
 */
export const deleteForm = async (formId) => {
  return httpClient.delete(`/formas/forms/${formId}`);
};

/**
 * 根据表单生成数据视图
 * @param {string} formId 表单ID
 * @returns {Promise} 生成结果
 */
export const generateDataview = async (formId) => {
  return httpClient.post(`/formas/forms/${formId}/dataview`);
};

/**
 * 表单排序
 * @param {Array} sortData 排序数据
 * @param {string} sortData[].id 表单ID
 * @param {number} sortData[].sequence 排序序号
 * @returns {Promise} 排序结果
 */
export const sortForms = async (sortData) => {
  return httpClient.patch('/api/forms/sort', sortData);
};

// src/api/form-instance.js
import httpClient from '@/lib/http-client';

/**
 * TODO: NEED a new API to query data view detail ... it includes form id!
 * 创建表单实例
 * @param {string} formId 表单ID
 * @param {object} formData 表单数据
 * @returns {Promise} 创建结果
 */
export const createFormInstance = async (formId, formData) => {
  return httpClient.post(`/formas/forms/${formId}/instances`, formData);
};

export const fetchFormInstance = async (formId, instanceId) => {
  const response = await httpClient.get(
    `/formas/forms/${formId}/instances/${instanceId}`,
    {}
  );
  return response;
};

export const updateFormInstance = async (formId, instanceId, formData) => {
  return httpClient.put(
    `/formas/forms/${formId}/instances/${instanceId}`,
    formData
  );
};

export const deleteFormInstance = async (formId, instanceId) => {
  return httpClient.delete(
    `/formas/forms/${formId}/instances/${instanceId}`,
    {}
  );
};

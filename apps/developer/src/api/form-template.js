// src/api/form-template.js
import httpClient from '@/utils/http-client';

// 获取表单触发器(数据视图DAO)模版
export const fetchFormTemplate = async formId => {
  const response = await httpClient.get(`/formas/forms/${formId}/hooks`, {});
  return response;
};

// 修改表单触发器(数据视图DAO)模版
export const updateFormTemplate = async (formId, pythonCode) => {
  return httpClient.put(`/formas/forms/${formId}/hooks`, pythonCode);
};

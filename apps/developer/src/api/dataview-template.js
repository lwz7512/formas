// src/api/dataview-template.js
import httpClient from '@/utils/http-client';

// 获取数据视图模版
export const fetchDataviewTemplate = async (dataviewId) => {
  const response = await httpClient.get(`/formas/dataviews/${dataviewId}/templates`, {
  });
  return response;
};

// 修改数据视图模版
export const updateDataviewTemplate = async (dataviewId, pythonCode) => {
  return httpClient.put(`/formas/dataviews/${dataviewId}/templates`, pythonCode);
};
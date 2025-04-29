// src/api/dataview-instance.js
import httpClient from '@/utils/http-client';

// 获取数据视图实例的列表
export const fetchDataviewInstanceList = async (dataviewId) => {
  const response = await httpClient.get(`/formas/dataviews/${dataviewId}/instances`, {
  });
  return response;
};
// src/api/dataview.js
import httpClient from '@/utils/http-client';

export const fetchDataviewList = async (moduleId) => {
  const response = await httpClient.post('/formas/dataviews/filter', {
    currPage: 1,
    pageSize: 1000,
    orders: [],
    searchs: [{ column: 'moduleId', op: 'eq', value: moduleId }]
  });
  return response;
};

export const deleteDataview = async id => {
  const response = await httpClient.delete(`/formas/dataviews/${id}`);
  return response.data;
};
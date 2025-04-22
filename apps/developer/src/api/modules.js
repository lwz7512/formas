// src/api/modules.js
import httpClient from '@/utils/http-client';
import { ROOT_BIZ_TREE_ID } from '@/config'; // 业务树根节点ID

export const fetchModuleTree = async () => {
  const response = await httpClient.get(`/sys/trees/${ROOT_BIZ_TREE_ID}/tree`);
  return response;
};

export const createModule = async moduleData => {
  const response = await httpClient.post('/sys/trees/node', moduleData);
  return response.data;
};

export const updateModule = async (id, moduleData) => {
  const response = await httpClient.put(`/sys/trees/${id}`, moduleData);
  return response.data;
};

export const deleteModule = async id => {
  const response = await httpClient.delete(`/sys/trees/${id}`);
  return response.data;
};

// src/api/modules.js
import httpClient from '@/utils/http-client';

export const fetchModuleTree = async () => {
  const id = "57dc25ba6f5511ee977638c9860954df"; // 业务树根节点ID
  const response = await httpClient.get(`/sys/trees/${id}/tree`);
  return response;
};

export const createModule = async (moduleData) => {
  const response = await httpClient.post('/api/modules', moduleData);
  return response.data;
};

export const updateModule = async (id, moduleData) => {
  const response = await httpClient.put(`/api/modules/${id}`, moduleData);
  return response.data;
};

export const deleteModule = async (id) => {
  const response = await httpClient.delete(`/api/modules/${id}`);
  return response.data;
};
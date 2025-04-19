// api/biztree.js
import httpClient from '@/utils/http-client';

export const fetchRootNodes = async () => {
  const response = await httpClient.get('/sys/trees/roots-table');
  return response;
};

export const createRootNode = async (node) => {
  const response = await httpClient.post('/sys/trees/root', node);
  return response.data;
};

export const deleteRootNode = async (id) => {
  const response = await httpClient.delete(`/sys/trees/${id}`);
  return response.data;
};

export const updateRootNode = async (id, node) => {
  const response = await httpClient.put(`/sys/trees/${id}`, node);
  return response.data;
};

export const fetchBiztreeChildNodes = async (id) => {
  const response = await httpClient.get(`/sys/trees/${id}/tree`);
  return response;
};

export const createChildNode = async (pid, node) => {
  node.pid = pid;
  const response = await httpClient.post('/sys/trees/node', node);
  return response.data;
};

export const deleteChildNode = async (id) => {
  const response = await httpClient.delete(`/sys/trees/${id}`);
  return response.data;
};

export const updateChildNode = async (id, node) => {
  const response = await httpClient.put(`/sys/trees/${id}`, node);
  return response.data;
};

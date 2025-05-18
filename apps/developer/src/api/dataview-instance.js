// src/api/dataview-instance.js
import httpClient from '@/utils/http-client';

/**
 * 获取数据视图实例的列表
 * @param {string} dataviewId 数据视图ID, from menu tree node
 * @returns {Promise} 数据视图实例列表
 */
export const fetchDataviewInstanceList = async dataviewId => {
  const response = await httpClient.get(
    `/formas/dataviews/${dataviewId}/instances`,
    {}
  );
  return response;
};

/**
 * 获取数据视图实例的详情, which includes form id
 * @param {string} dataviewId 数据视图ID, from menu tree node
 * @returns {Promise} 数据视图实例详情
 */
export const fetchDataviewDetail = async dataviewId => {
  const response = await httpClient.get(`/formas/dataviews/${dataviewId}`, {});
  return response;
};

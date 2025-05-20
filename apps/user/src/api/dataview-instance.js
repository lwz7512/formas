// src/api/dataview-instance.js
import httpClient from '@/lib/http-client';

/**
 * 获取数据视图实例(aka, form instance)的列表
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

/*
      orders: [{ column: 'sequence', dir: 'asc' }],
      searchs: [{ column: 'moduleId', op: 'eq', value: moduleId }],
*/
export const fetchDataviewInstanceListByFilter = async (
  dataviewId,
  currPage=1,
  pageSize=20,
  orders=[],
  searchs=[]
) => {
  const response = await httpClient.post(
    `/formas/dataviews/${dataviewId}/instances/filter`,
    {
      currPage: currPage,
      pageSize: pageSize,
      orders: orders,
      searchs: searchs,
    }
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

/**
 * query schema json for defined form
 * @param {string} key form id
 * @returns
 */
export const fetchFormSchema = async key => {
  const url = `/formas/forms/${key}`;
  const result = await httpClient.get(url);
  return result;
};

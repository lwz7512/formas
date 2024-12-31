import { SERVICE_HOST_POST as host } from '@/config';
import {
  vanillaPostData,
  vanillaDeleteData,
  vanillaPutData,
  // vanillaGetData,
} from '.';

/**
 * 查询数据视图定义列表 with `post` method
 * @returns {Promise} form list
 */
export const fetchDataviewList = async () => {
  const params = {
    currPage: 1,
    pageSize: 100,
    orders: [
      {
        column: 'sequence',
        dir: 'asc',
      },
    ],
    searchs: [],
  };
  const result = await vanillaPostData(
    `${host}/api/formas/dataviews/filter`,
    params
  );
  return result;
};

/**
 * 创建数据视图定义
 * @param {{moduleId: string, formDefineId: string, title: string, note: string, sequence:string}} item
 */
export const createDataview = async item => {
  const { moduleId, formDefineId, title, note, sequence } = item;
  const result = await vanillaPostData(`${host}/api/formas/dataviews`, {
    moduleId: moduleId,
    formDefineId: formDefineId,
    title: title,
    note: note,
    sequence: sequence,
  });
  return result;
};

/**
 * 修改数据视图定义
 */
export const updateDataview = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/dataviews/${item.key}`,
    {
      title: item.title,
      note: item.note,
      sequence: item.sequence,
    }
  );
  return result;
};

/**
 * 删除数据视图定义
 * @param {string} key dataview id
 */
export const removeDataview = async key => {
  const result = await vanillaDeleteData(`${host}/api/formas/dataviews/${key}`);
  return result;
};

/**
 * 修改数据视图定义状态
 */
export const updateDataviewStatus = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/dataviews/${item.key}/status`,
    {
      status: item.status,
    }
  );
  return result;
};

/**
 * 修改数据视图定义模块
 */
export const updateDataviewModule = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/dataviews/${item.key}/module`,
    {
      moduleId: item.moduleId,
    }
  );
  return result;
};

/**
 * 修改数据视图定义SQL配置信息
 */
export const updateDataviewSql = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/dataviews/${item.key}/sql`,
    {
      sqlStmt: item.sqlStmt,
      sqlParams: item.sqlParams,
    }
  );
  return result;
};

import { SERVICE_GATE_API as host } from '@/config';
import {
  vanillaPostData,
  vanillaDeleteData,
  vanillaPutData,
  // vanillaGetData,
} from '.';

/**
 * 查询数据源列表
 * @returns {Promise} datasource list
 */
export const fetchDatasourceList = async () => {
  const params = {
    currPage: 1,
    pageSize: 100,
    orders: [],
    searchs: [],
  };
  const result = await vanillaPostData(
    `${host}/api/formas/datasources/filter`,
    params
  );
  return result;
};

/**
 * 创建数据源
 * @param {{driver: string, title: string, host: string, port: string, database: string, instance: string, user: string, password: string}} item
 */
export const createDatasources = async item => {
  const result = await vanillaPostData(`${host}/api/formas/datasources`, {
    driver: item.driver,
    title: item.title,
    host: item.host,
    port: item.port,
    database: item.database,
    instance: item.instance,
    user: item.user,
    password: item.password,
    isDefault: item.isDefault || 0,
  });
  // check `errCode` and `errMsg` from response!
  if (result.errCode !== 200) {
    throw new Error(result.errMsg);
  }
  return result;
};

/**
 * 修改数据源
 */
export const updateDatasources = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/datasources/${item.key}`,
    {
      driver: item.driver,
      title: item.title,
      host: item.host,
      port: item.port,
      database: item.database,
      instance: item.instance,
      user: item.user,
      password: item.password,
      isDefault: item.isDefault,
    }
  );
  // check `errCode` and `errMsg` from response!
  if (result.errCode !== 200) {
    throw new Error(result.errMsg);
  }
  return result;
};

/**
 * 删除数据源
 * @param {string} key datasource id
 */
export const removeDatasources = async key => {
  const result = await vanillaDeleteData(
    `${host}/api/formas/datasources/${key}`
  );
  return result;
};

/**
 * 测试数据源是否可用
 * @param {string} key datasource id
 */
export const testDatasourcesConnection = async key => {
  const sqlStmt = 'SELECT 1 AS a FROM DUAL';
  const result = await vanillaPostData(
    `${host}/api/formas/datasources/${key}/query-one`,
    {
      sqlStmt: sqlStmt,
    }
  );
  // check `errCode` and `errMsg` from response!
  if (result.errCode !== 200) {
    throw new Error(result.errMsg);
  }
  return result;
};

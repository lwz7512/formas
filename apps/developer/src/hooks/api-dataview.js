import { useAsyncFn } from 'react-use';

import { SERVICE_GATE_API as host } from '@/config';
import {
  vanillaPostData,
  vanillaDeleteData,
  vanillaPutData,
  // vanillaGetData,
} from '.';

const tableRowGenerator = view => ({
  ...view,
  key: view.id, // key property is required by ant-table data source
});

export const useViewList = () => {
  const [state, doFetch] = useAsyncFn(async sysModuleId => {
    const result = await fetchDataviewList(sysModuleId);
    const { datas } = result;
    if (!datas) {
      console.warn(`## No result for dictionary definition!`);
      return null;
    }
    return datas.map(tableRowGenerator);
  }, []);

  return {
    loading: state.loading,
    views: state.value,
    refreshViews: doFetch,
  };
};

/**
 * 查询数据视图定义列表 with `post` method
 * @returns {Promise} form list
 */
export const fetchDataviewList = async sysModuleId => {
  const searchs = sysModuleId
    ? [
        {
          column: 'moduleId',
          op: 'eq',
          value: sysModuleId,
        },
      ]
    : [];
  const params = {
    currPage: 1,
    pageSize: 100,
    orders: [
      {
        column: 'sequence',
        dir: 'asc',
      },
    ],
    searchs,
  };
  const result = await vanillaPostData(
    `${host}/api/formas/dataviews/filter`,
    params
  );
  return result;
};

/**
 * 创建数据视图定义(从表单定义创建)
 * @param {{moduleId: string, id: string, title: string, note: string, sequence: string}} formRecord
 */
export const createDataview = async formRecord => {
  const { moduleId, id, title, note, sequence } = formRecord;
  const result = await vanillaPostData(`${host}/api/formas/dataviews`, {
    formId: id,
    moduleId,
    title,
    note,
    sequence,
  });
  if (result.errCode !== 200) {
    throw new Error(result.errMsg);
  }
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
  if (result.errCode !== 200) {
    throw new Error(result.errMsg);
  }
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

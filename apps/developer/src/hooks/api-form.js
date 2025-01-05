import { useEffect } from 'react';

import { useAsyncFn } from 'react-use';

import { SERVICE_GATE_API as host } from '@/config';
import {
  vanillaPostData,
  vanillaDeleteData,
  vanillaPutData,
  vanillaGetData,
} from '.';

const tableRowGenerator = form => ({
  ...form,
  key: form.id,
});

export const useFormList = () => {
  const [state, doFetch] = useAsyncFn(async () => {
    const result = await fetchFormDefineList();
    const { datas } = result;
    if (!datas) {
      console.warn(`## No result for dictionary definition!`);
      return null;
    }
    return datas.map(tableRowGenerator);
  }, []);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return {
    loading: state.loading,
    forms: state.value,
    refreshForms: doFetch,
  };
};

/**
 * 查询表单定义列表 with `post` method
 * @returns {Promise} form list
 */
export const fetchFormDefineList = async () => {
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
    `${host}/api/formas/forms/filter`,
    params
  );
  return result;
};

/**
 * 创建表单定义
 * @param {{moduleId: string, title: string, note: string, sequence:string}} item
 */
export const createFormDefine = async item => {
  const { moduleId, title, note, sequence } = item;
  const result = await vanillaPostData(`${host}/api/formas/forms`, {
    moduleId: moduleId,
    title: title,
    note: note,
    sequence: sequence,
  });
  return result;
};

/**
 * 修改表单定义
 */
export const updateFormDefine = async item => {
  const result = await vanillaPutData(`${host}/api/formas/forms/${item.key}`, {
    title: item.title,
    note: item.note,
    sequence: item.sequence,
  });
  return result;
};

/**
 * 删除表单定义
 * @param {string} key formDefine id
 */
export const removeFormDefine = async key => {
  const result = await vanillaDeleteData(`${host}/api/formas/forms/${key}`);
  return result;
};

/**
 * 修改表单定义状态
 */
export const updateFormDefineStatus = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/forms/${item.key}/status`,
    {
      status: item.status,
    }
  );
  return result;
};

/**
 * 修改表单定义模块
 */
export const updateFormDefineModule = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/forms/${item.key}/module`,
    {
      moduleId: item.moduleId,
    }
  );
  return result;
};

/**
 * 修改表单定义配置信息
 */
export const updateFormDefineSchema = async item => {
  const result = await vanillaPutData(
    `${host}/api/formas/forms/${item.key}/schema`,
    {
      schema: item.schema,
    }
  );
  return result;
};

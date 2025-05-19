/**
 * 数据视图的钩子
 */

import { useState } from 'react';
import {
  fetchDataviewInstanceList,
  fetchDataviewDetail,
  fetchFormSchema,
} from '@/api/dataview-instance';

export const useDataView = () => {
  const [dataview, setDataview] = useState(null);
  const [rows, setRows] = useState([]);
  const [schema, setSchema] = useState(null);

  const { formId } = dataview || {};

  /**
   * 树节点选择处理
   * @param {Object} _ - 事件对象
   * @param {Object} node - 选中的节点
   */
  const treeNodeSelectHandler = async (_, { node }) => {
    if (node.type === 'dataview') {
      // get dataview instance list by dataview id, mainly for table view rows
      const { datas: rows } = await fetchDataviewInstanceList(node.value);
      const validRows = rows.map(row => ({
        key: row.id,
        ...row,
      }));
      setRows(validRows);
      // toast.success(`load rows: ${validRows.length}`);

      // get dataview detail by dataview id, mainly for table view columns
      // dataviewDetail 中包含 `formId`!
      // TODO: 这里需要优化，因为 dataviewDetail 和 formSchema 是同时获取的，可以合并成一个请求
      const { data: dataviewDetail } = await fetchDataviewDetail(node.value);
      setDataview(dataviewDetail);

      console.log('dataviewDetail', dataviewDetail);

      // get form `schema` definition(from form designer) by form id
      const {
        data: { schema },
      } = await fetchFormSchema(dataviewDetail.formId);
      setSchema(JSON.parse(schema));
    } else {
      // toast.warning(`Click on: ${node.type}`);
    }
  };

  const refreshFormInstanceTable = async () => {
    const { datas: rows } = await fetchDataviewInstanceList(dataview.id);
    const validRows = rows.map(row => ({
      key: row.id,
      ...row,
    }));
    setRows(validRows);
  };

  return {
    dataview,
    rows,
    schema,
    formId,
    treeNodeSelectHandler,
    refreshTable: refreshFormInstanceTable,
  };
};

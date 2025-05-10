/**
 * 数据视图的钩子
 */

import { useState } from 'react';
import {
  fetchDataviewInstanceList,
  fetchDataviewDetail,
} from '@/api/dataview-instance';

export const useDataView = () => {
  const [dataview, setDataview] = useState(null);
  const [rows, setRows] = useState([]);

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

      // get dataview detail by dataview id, mainly for table view columns
      const { data: dataviewDetail } = await fetchDataviewDetail(node.value);
      setDataview(dataviewDetail);
    } else {
      console.log(`>>> clicke on: ${node.type}`);
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
    treeNodeSelectHandler,
    refreshTable: refreshFormInstanceTable,
  };
};

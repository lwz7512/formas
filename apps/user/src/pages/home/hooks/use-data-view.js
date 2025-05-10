/**
 * 数据视图的钩子
 */

import { useState, useEffect } from 'react';
import {
  fetchDataviewInstanceList,
  fetchDataviewDetail,
} from '@/api/dataview-instance';

export const useDataView = () => {
  const [dataview, setDataview] = useState(null);

  // load dataview instance list and detail from tree node select
  const treeNodeSelectHandler = async (_, { node }) => {
    if (node.type === 'dataview') {
      // console.log('view node', node);
      // get dataview instance list by dataview id, mainly for table view rows
      const { datas: rows } = await fetchDataviewInstanceList(node.value);
      console.log('dataview rows', rows);
      const { data: dataviewDetail } = await fetchDataviewDetail(node.value);
      console.log('dataviewDetail', dataviewDetail);
      setDataview(dataviewDetail);
    } else {
      console.log(`>>> clicke on: ${node.type}`);
    }
  };

  return {
    dataview,
    treeNodeSelectHandler,
  };
};

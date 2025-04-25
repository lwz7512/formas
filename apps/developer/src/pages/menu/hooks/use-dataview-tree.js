// hooks/use-dataview-tree.js
import { useState, useCallback, useEffect } from 'react';
import { fetchDataviewTree } from '@/api/dataview';

export const useDataviewTree = () => {
  const [dataviewTree, setDataviewTree] = useState([]);

  const loadDataviewTree = useCallback(async (parentId) => {
    const resp = await fetchDataviewTree(parentId);
    if (resp.errCode === 200) {
      setDataviewTree(resp.datas);
    }
    return resp;
  }, []);

  useEffect(() => {
    // 初始加载
    fetchDataviewTree().then(resp => {
      if (resp.errCode === 200) {
        setDataviewTree(resp.datas);
      }
    });
  }, []);

  return {
    dataviewTree,
    treeSelectData: dataviewTree, // 直接返回原始数据，由调用方决定如何转换
    loadDataviewTree,
  };
};

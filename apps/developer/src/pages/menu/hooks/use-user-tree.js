// hooks/use-menu-tree-query.js
import { useState, useCallback, useEffect } from 'react';
import { fetchMenuTree } from '@/api/api-menu';
import { ROOT_MENU_PID } from '@/config';

export const useMenuTreeQuery = () => {
  const [subTreeStruc, setSubTreeStruc] = useState([]);

  const loadTreeBy = useCallback(async (menuId) => {
    const resp = await fetchMenuTree(menuId);
    if (resp.errCode === 200) {
      const children = resp.datas[0].children; // 去掉根节点
      setSubTreeStruc(children);
    }
    return resp;
  }, []);

  useEffect(() => {
    // 初始加载时也直接使用返回的数据
    fetchMenuTree(ROOT_MENU_PID).then(resp => {
      if (resp.errCode === 200) {
        const children = resp.datas[0].children; // 去掉根节点
        setSubTreeStruc(children);
      }
    });
  }, []);

  return {
    subTreeStruc,
    treeSelectData: subTreeStruc, // 直接返回原始数据，不再转换
    loadTreeBy,
  };
};
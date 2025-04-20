import { useState, useCallback, useEffect } from 'react';

import { rebuildSimpleTree } from '@/utils';
import { fetchMenuTree } from '@/api/api-menu';
import { ROOT_MENU_PID } from '@/config';

const ROOT_MENU_TITLE = '根菜单';

/**
 * Load menu tree struc by root node id
 * @returns
 */
export const useMenuTreeQuery = () => {
  const [subTreeStruc, setSubTreeStruc] = useState([]);

  // transform to data-structure of `TreeSelect`:
  const treeSelectData = rebuildSimpleTree(subTreeStruc[0]);

  // a memorized load tree function
  const mLoadTreeBy = useCallback(async menuId => {
    // load children:
    const resp = await fetchMenuTree(menuId);
    // console.log(resp);
    if (resp.errCode == 200) {
      const [rootNode] = resp.datas;
      rootNode.title = ROOT_MENU_TITLE;
      setSubTreeStruc([rootNode]);
    }
    return resp;
  }, []);

  useEffect(() => {
    fetchMenuTree(ROOT_MENU_PID).then(resp => {
      if (resp.errCode == 200) {
        const [rootNode] = resp.datas;
        rootNode.title = ROOT_MENU_TITLE;
        setSubTreeStruc([rootNode]);
      }
    });
  }, []);

  return {
    subTreeStruc,
    treeSelectData,
    loadTreeBy: mLoadTreeBy,
  };
};

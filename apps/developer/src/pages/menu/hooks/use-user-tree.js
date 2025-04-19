import { useState, useCallback } from 'react';

import { rebuildSimpleTree } from '@/utils';
import { fetchMenuTree } from '@/api/api-menu';

/**
 * Load menu tree struc by root node id
 * @returns
 */
export const useMenuTreeQuery = () => {
  const [subTreeStruc, setSubTreeStruc] = useState([]);

  // transform to data-structure of `TreeSelect`:
  const treeSelectData = rebuildSimpleTree(subTreeStruc[0]);

  // a memorized load tree function
  const mLoadTreeBy = useCallback(async (menuId, title) => {
    // load children:
    const resp = await fetchMenuTree(menuId);
    // console.log(resp);
    if (resp.errCode == 200) {
      const nodes = resp.datas;
      setSubTreeStruc([nodes[0]]);
    }
    return resp;
  }, []);

  return {
    subTreeStruc,
    treeSelectData,
    loadTreeBy: mLoadTreeBy,
  };
};

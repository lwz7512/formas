import { useState } from 'react';
import { nanoid } from 'nanoid';

import { SERVICE_HOST_POST as host } from '@/config';

import { useFetchData, useOnDemandFetch } from './use-fetch-data';
import { useAsyncPost } from './use-post-data';

/**
 * === source node structure: ===
 * {
 *   depth: 1,
 *   description: '',
 *   id: '',
 *   key: '',
 *   lft: 1,
 *   rgt: 1,
 *   num: 0,
 *   pid: '',
 *   rootid: '',
 *   status: 0,
 *   title: '',
 *   children: []
 * }
 * === destination node structure: ===
 * {
 *
 * }
 * @param {*} srcNode
 * @param {*} destNode
 */
const recursiveTreeNode = (srcNode, destNode) => {
  //
};

export const useBizTreeRoots = () => {
  const rootsState = useFetchData(`${host}/api/sys/trees/roots-table`);
  const { error, datas, loading, refresh } = rootsState;
  return {
    error,
    loading,
    list: datas,
    refresh,
  };
};

/**
 * Load tree struc by root node id
 * @returns
 */
export const useBizTreeQuery = () => {
  // `/api/sys/trees/([A-Za-z0-9]+)/tree`
  const { doFetch } = useOnDemandFetch();

  const [subTreeStruc, setSubTreeStruc] = useState([]);

  return {
    subTreeStruc,
    loadTreeBy: async (rootId, title) => {
      // construct root node:
      setSubTreeStruc([
        {
          key: rootId,
          title,
          children: [], // to fill with later in fetching result
        },
      ]);
      // load children:
      const url = `${host}/api/sys/trees/${rootId}/tree`;
      const resp = await doFetch(url);
      // console.log(resp);
      if (resp.errCode == 200) {
        const nodes = resp.datas;
        setSubTreeStruc([
          {
            key: rootId,
            title,
            children: nodes,
          },
        ]);
      }

      return resp;
    },
  };
};

export const useBizTreeRootCreate = (onRootNodeSuccess, onChildNodeSuccess) => {
  const createState = useAsyncPost();
  const { error, loading, doPost, ...response } = createState;

  const doRootNodeAdd = async (title, description) => {
    // NOTE: Client side uuid generaton:
    const rootid = nanoid();
    // console.log(`>>>> add rooot node: ${title} for root: ${rootid}`);
    const payload = {
      rootid,
      title,
      description,
    };
    const resp = await doPost(`${host}/api/sys/trees/root`, payload);
    if (resp.errCode == 200) {
      onRootNodeSuccess && onRootNodeSuccess();
    }
    return resp;
  };

  const doChildNodeAdd = async (parentId, title, description) => {
    const payload = {
      pid: parentId,
      title,
      description,
    };
    const resp = await doPost(`${host}/api/sys/trees/node`, payload);
    if (resp.errCode == 200) {
      onChildNodeSuccess && onChildNodeSuccess();
    }
  };

  return {
    error,
    loading,
    ...response,
    doRootNodeAdd,
    doChildNodeAdd,
  };
};

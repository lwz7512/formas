import { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';

import { SERVICE_GATE_API as host } from '@/config';

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
 *   ...rawNode,
 *   value: id,
 * }
 * @deprecated
 * @param {object} srcNode
 * @returns destNode cloned tree structure with additional property
 */
const recursiveTreeNode = srcNode => {
  if (!srcNode) return [];
  const cloneTree = JSON.parse(JSON.stringify(srcNode));
  const iterator = node => {
    // add new property `value`:
    node.value = node.id;
    const children = node.children;
    if (!children) return;
    children.forEach(c => iterator(c));
  };
  iterator(cloneTree);
  return [cloneTree];
};

/**
 * rebuild new tree in simple structure
 * @param {object} srcNode
 * @returns
 */
const rebuildSimpleTree = srcNode => {
  if (!srcNode) return [];
  const traversor = (sn, dn) => {
    dn.value = sn.id;
    dn.key = sn.id; // key is a must to have
    dn.title = sn.title;
    if (sn.children) {
      dn.children = [];
      sn.children.forEach(c => {
        const nc = {};
        dn.children.push(nc);
        traversor(c, nc);
      });
    }
  };
  const newTreeRoot = {};
  traversor(srcNode, newTreeRoot);
  return [newTreeRoot];
};

/**
 * fetch root nodes in the left tree
 * @returns
 */
export const useBizTreeRoots = () => {
  const rootsState = useFetchData(`${host}/api/sys/trees/roots-table`);
  const { error, datas, loading, refresh } = rootsState;
  return {
    error,
    loading,
    list: datas || [],
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

  // transform to data-structure of `TreeSelect`:
  const treeSelectData = rebuildSimpleTree(subTreeStruc[0]);

  // a memorized load tree function
  const mLoadTreeBy = useCallback(
    async (rootId, title) => {
      // construct root node:
      setSubTreeStruc([
        {
          depth: 0, // root node level
          key: rootId,
          id: rootId,
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
            id: rootId,
            title,
            children: nodes,
          },
        ]);
      }
      return resp;
    },
    [doFetch]
  );

  return {
    subTreeStruc,
    treeSelectData,
    loadTreeBy: mLoadTreeBy,
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

import { useSyncExternalStore } from 'react';

let newChildNode = {
  pid: '', // to set biz-module id
  title: '',
  description: '',
};

let expandedKeys = [];

/**
 * callback functions would dynamically change
 */
let listeners = [];

const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

const selectedTreeNodeStore = {
  /**
   * save newly selected tree node
   * @param {*} node
   */
  setNewChildNode(node) {
    newChildNode = node;
    emitChange();
  },
  // == inline method ==
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      // remove the newly added listener to achieve unsubscribe
      listeners = listeners.filter(l => l !== listener);
    };
  },
  /**
   * exposed state change handler for `useSyncExternalStore`
   * @returns an immutable catalogues store state
   */
  getSnapshot() {
    return newChildNode;
  },
};

/**
 * Search tree node by key and reture the path of search result
 *
 * @param {object} rootNode - the root node of the tree
 * @param {string|undefined} key - the key of the node to search
 * @returns {array} the path of the node to search
 */
const searchTreeNodeByKeyAndReturnPath = (rootNode, key) => {
  const result = [];
  if (!key) return result;
  const iterator = (node, pathArray) => {
    if (node.key === key) {
      result.push(...pathArray);
    }
    if (node.children) {
      node.children.forEach(c => iterator(c, [...pathArray, c.key]));
    }
  };
  iterator(rootNode, [rootNode.key]);
  return result;
};

/**
 * global tree node store
 * @returns selected node
 */
export const useTreeNodeStore = treeSelectData => {
  const { subscribe, getSnapshot } = selectedTreeNodeStore;
  const newChildNode = useSyncExternalStore(subscribe, getSnapshot);

  const onTreeNodeSelect = (selectedKeys, { node }) => {
    if (node.pos == '0-0') return; // skip root node selection!
    const [pid] = selectedKeys;
    // remember selected parent node
    selectedTreeNodeStore.setNewChildNode({
      ...newChildNode,
      pid,
      title: node.title, // ??
    });

    // remember expanded keys
    const rootNode = treeSelectData[0];
    if (!rootNode) return;
    expandedKeys = searchTreeNodeByKeyAndReturnPath(rootNode, pid);
  };

  return {
    expandedKeys:
      expandedKeys.length > 0 ? expandedKeys : [treeSelectData[0]?.key],
    /**
     * newly selected tree node
     */
    newChildNode,
    /**
     * handler for tree node selection
     */
    onTreeNodeSelect,
  };
};

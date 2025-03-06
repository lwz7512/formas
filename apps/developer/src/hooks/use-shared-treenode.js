import { useSyncExternalStore } from 'react';

let newChildNode = {
  pid: '', // to set biz-module id
  title: '',
  description: '',
};

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
 * global tree node store
 * @returns selected node
 */
export const useTreeNodeStore = () => {
  const { subscribe, getSnapshot } = selectedTreeNodeStore;
  const newChildNode = useSyncExternalStore(subscribe, getSnapshot);

  const onTreeNodeSelect = (selectedKeys, { node }) => {
    if (node.pos == '0-0') return; // root node
    const [pid] = selectedKeys;
    // console.log(`>>> node clicked: ${pid}`);
    // remember selected parent node
    selectedTreeNodeStore.setNewChildNode({
      ...newChildNode,
      pid,
      title: node.title, // ??
    });
  };

  return {
    newChildNode,
    onTreeNodeSelect,
  };
};

import { USER_SESSION_VALID_TIME } from '../config';

// == NO NEED TO PUT IT IN HOOKS, OR PRODUCE UNNECESSARY RERENDERS INSIDE HOOKS ==
// 辅助函数：根据ID查找模块
export const findModuleById = (id, treeData) => {
  for (const node of treeData) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findModuleById(id, node.children);
      if (found) return found;
    }
  }
  return null;
};

// == NO NEED TO PUT IT IN HOOKS, OR PRODUCE UNNECESSARY RERENDERS INSIDE HOOKS ==
// 获取一个节点的所有父级key（递归实现）
export const getParentKeys = (targetId, treeData, keys = []) => {
  for (const node of treeData) {
    if (node.id === targetId) return keys;
    if (node.children) {
      const found = getParentKeys(targetId, node.children, [...keys, node.id]);
      if (found) return found;
    }
  }
  return null;
};

/**
 * check if the user is logged in and the login time is valid
 * @returns {boolean}
 */
export const isLoggedInValid = () => {
  const lastLogin = localStorage.getItem('formas.lastLogin');
  if (!lastLogin) {
    return false;
  }
  // compare last login time with current time
  const lastLoginTime = new Date(lastLogin);
  const currentTime = new Date();
  const timeDiff = currentTime - lastLoginTime;
  // 24 hours * USER_SESSION_VALID_TIME
  const oneDay = 1000 * 60 * 60 * 24 * USER_SESSION_VALID_TIME;
  if (timeDiff > oneDay) {
    return false;
  }
  return true;
};

/**
 * rebuild new tree to add `key` property for each node!
 * @param {object} srcNode
 * @returns
 */
export const rebuildSimpleTree = srcNode => {
  if (!srcNode) return [];
  const traversor = (sn, dn) => {
    // ! copy properties from source node to destination node, to keep the same structure!
    // @date 2025/04/20
    Object.assign(dn, sn);
    dn.key = sn.id; // key is a must to have
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

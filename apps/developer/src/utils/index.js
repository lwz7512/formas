import { USER_SESSION_VALID_TIME } from '../config';

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

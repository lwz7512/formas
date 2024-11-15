import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/** 
 * 查询树，以树状结构返回
 * @returns {*} {datas:数组[{每条记录为字典, "children":[每条记录为字典]},{}]}
 */
export const fatchBiztree = (nodeid) => {
  const { data, error, loading } = useFetchData(`/api/sys/trees/${nodeid}/tree`);
  return { data, error, loading };
};

/** 
 * 查询树，以数组结构返回
 * @returns {*} {datas:数组[{每条记录为字典},{}]}
 */
export const fatchBiztreeList = (nodeid) => {
  const { data, error, loading } = useFetchData(`/api/sys/trees/${nodeid}/table`);
  return { data, error, loading };
};

/** 
 * 创建根节点
 */
export const createBiztreeRoot = (rootid, title, description) => {
  const { data, error, loading } = usePostData(`/api/sys/trees/root`, {
    rootid: rootid,
    title: title,
    description: description,
  });
  return { data, error, loading };
};

/** 
 * 创建树节点
 */
export const createBiztreeNode = (pid, title, description) => {
  const { data, error, loading } = usePostData(`/api/sys/trees/node`, {
    pid: pid,
    title: title,
    description: description,
  });
  return { data, error, loading };
};

/** 
 * 修改树节点信息
 */
export const modifyBiztreeNode = (nodeid, title, description) => {
  const { data, error, loading } = usePutData(`/api/sys/trees/${nodeid}`, {
    title: title,
    description: description,
  });
  return { data, error, loading };
};

/**
 * 移动树节点位置
 * @param {*} srcId 源节点ID
 * @param {*} destId 目标节点ID
 * @param {*} place 位置: before, after
 * @param {*} relation 关系：child, brother
 * @returns 
 */
export const moveBiztreeNode = (srcId, destId, place, relation) => {
  const { data, error, loading } = usePutData(`/api/sys/trees/${nodeid}`, {
    srcId: srcId,
    destId: destId,
    place: place,
    relation: relation,
  });
  return { data, error, loading };
};

/** 
 * 删除树节点
 */
export const removeBiztreeNode = (nodeid) => {
  const { data, error, loading } = useDeleteData(`/api/sys/trees/${nodeid}`);
  return { data, error, loading };
};
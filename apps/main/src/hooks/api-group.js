import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/**
 * 查询部门列表
 */
export const fetchGroupList = (groupId) => {
  const { data, error, loading } = usePostData(
    `/api/auth/v5/groups/${groupId}/table`,
    {}
  );
  return { data, error, loading };
};

/**
 * 查询部门列表, 以树状结构返回
 */
export const fetchGroupTree = (groupId) => {
  const { data, error, loading } = usePostData(
    `/api/auth/v5/groups/${groupId}/tree`,
    {}
  );
  return { data, error, loading };
};

/**
 * 创建部门
 */
export const createGroup = (pid, title) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/groups`, {
    pid: pid,
    title: title,
  });
  return { data, error, loading };
};

/**
 * 修改部门
 */
export const modifyGroup = (id, title) => {
  const { data, error, loading } = usePutData(`/api/auth/v5/groups/${id}`, {
    title: title,
  });
  return { data, error, loading };
};

/**
 * 查询部门
 * @param {*} id
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fetchGroup = (id) => {
  const { data, error, loading } = useFetchData(`/api/auth/v5/groups/${id}`);
  return { data, error, loading };
};

/**
 * 删除部门
 */
export const removeGroup = (id) => {
  const { data, error, loading } = useDeleteData(`/api/auth/v5/groups/${id}`);
  return { data, error, loading };
};

/**
 * 获取某个部门的账号列表
 * @param {*} id
 * @returns {*} {datas:数组[{返回结果记录为字典}]}
 */
export const fetchGroupAccounts = (groupId) => {
  const { data, error, loading } = useFetchData(
    `/api/auth/v5/groups/${groupId}/accounts`
  );
  return { data, error, loading };
};

/**
 * 授权账号给部门
 * @param {*} groupId 
 * @param {*} accountIds 字符串数组[accountId, accountId2]
 * @returns 
 */
export const grantAccountsToGroup = (groupId, accountIds) => {
  const { data, error, loading } = usePutData(
    `/api/auth/v5/groups/${groupId}/accounts`,
    {accountIds: accountIds}
  );
  return { data, error, loading };
};

/**
 * 撤销部门账号
 * @param {*} groupId 
 * @param {*} accountIds 字符串数组[accountId, accountId2]
 * @returns 
 */
export const revokeAccountsFromGroup = (groupId, accountIds) => {
  const { data, error, loading } = useDeleteData(
    `/api/auth/v5/groups/${groupId}/accounts`,
    {accountIds: accountIds}
  );
  return { data, error, loading };
};

/**
 * 移动树节点位置
 * @param {*} srcId 源节点ID
 * @param {*} objId 目标节点ID
 * @param {*} place 位置: before, after
 * @param {*} relation 关系：child, brother
 * @returns 
 */
export const moveGroup = (groupId, objId, place, relation) => {
  const { data, error, loading } = usePutData(`/api/auth/v5/groups/${groupId}/move`, {
    srcId: srcId,
    objId: objId,
    place: place,
    relation: relation,
  });
  return { data, error, loading };
};

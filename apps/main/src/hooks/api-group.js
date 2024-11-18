import { useFetchData, usePostData, usePutData, useDeleteData } from '.';
/**
 * 查询部门列表
 */
export const useFetchGroupList = groupId => {
  const { data, error, loading } = usePostData(
    `/api/auth/v5/groups/${groupId}/table`,
    {}
  );
  return { data, error, loading };
};

/**
 * 查询部门列表, 以树状结构返回
 */
export const useFetchGroupTree = groupId => {
  const { data, error, loading } = usePostData(
    `/api/auth/v5/groups/${groupId}/tree`,
    {}
  );
  return { data, error, loading };
};

/**
 * 创建部门
 */
export const useCreateGroup = (pid, title) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/groups`, {
    pid: pid,
    title: title,
  });
  return { data, error, loading };
};

/**
 * 修改部门
 */
export const useModifyGroup = (id, title) => {
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
export const useFetchGroup = id => {
  const { data, error, loading } = useFetchData(`/api/auth/v5/groups/${id}`);
  return { data, error, loading };
};

/**
 * 删除部门
 */
export const useRemoveGroup = id => {
  const { data, error, loading } = useDeleteData(`/api/auth/v5/groups/${id}`);
  return { data, error, loading };
};

/**
 * 获取某个部门的账号列表
 * @param {*} id
 * @returns {*} {datas:数组[{返回结果记录为字典}]}
 */
export const useFetchGroupAccounts = groupId => {
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
export const useGrantAccountsToGroup = (groupId, accountIds) => {
  const { data, error, loading } = usePutData(
    `/api/auth/v5/groups/${groupId}/accounts`,
    { accountIds: accountIds }
  );
  return { data, error, loading };
};

/**
 * 撤销部门账号
 * @param {*} groupId
 * @param {*} accountIds 字符串数组[accountId, accountId2]
 * @returns
 */
export const useRevokeAccountsFromGroup = (groupId, accountIds) => {
  const { data, error, loading } = useDeleteData(
    `/api/auth/v5/groups/${groupId}/accounts`,
    { accountIds: accountIds }
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
export const useMoveGroup = (groupId, objId, place, relation) => {
  const { data, error, loading } = usePutData(
    `/api/auth/v5/groups/${groupId}/move`,
    {
      srcId: groupId,
      objId: objId,
      place: place,
      relation: relation,
    }
  );
  return { data, error, loading };
};

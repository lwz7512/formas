import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/**
 * 查询账号列表
 * @param {*} page 当前页
 * @param {*} size 每页记录数
 * @param {*} orders 排序，数组[{'column':'name', 'dir':'asc'},{'column':'title', 'dir':'desc'}]
 * @param {*} searchs 过滤条件，数组[{'column':'name', 'op':'eq', 'value':'系统字典'}]
 * @returns {*} {currPage:当前页, pageSize:每页记录数, totalNum:总记录数, totalPage:总页数, datas:数组[{每条记录为字典},{}]}
 */
export const fetchAccountList = (page, size, orders, searchs) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/accounts/filter`, {
    page: page,
    size: size,
    orders: orders,
    searchs: searchs,
  });
  return { data, error, loading };
};

/**
 * 创建账号，默认密码为 123456
 * @param {*} loginName
 * @param {*} username
 * @returns
 */
export const createAccount = (loginName, username) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/accounts`, {
    loginName: loginName,
    username: username,
  });
  return { data, error, loading };
};

/**
 * 获取某个账号的信息
 * @param {*} id
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fetchAccount = (accountId) => {
  const { data, error, loading } = useFetchData(
    `/api/auth/v5/accounts/${accountId}`
  );
  return { data, error, loading };
};

/**
 * 获取某个账号的角色列表
 * @param {*} id
 * @returns {*} {datas:数组[{返回结果记录为字典}]}
 */
export const fetchAccountRoles = (accountId) => {
  const { data, error, loading } = useFetchData(
    `/api/auth/v5/accounts/${accountId}/roles`
  );
  return { data, error, loading };
};

/**
 * 锁定账号
 */
export const lockAccount = (accountId) => {
  const { data, error, loading } = usePutData(
    `/api/auth/v5/accounts/${accountId}/lock`,
    {}
  );
  return { data, error, loading };
};

/**
 * 解锁账号
 */
export const unlockAccount = (accountId) => {
  const { data, error, loading } = usePutData(
    `/api/auth/v5/accounts/${accountId}/unlock`,
    {}
  );
  return { data, error, loading };
};

/**
 * 授权角色给账号
 * @param {*} accountId 
 * @param {*} roleIds 字符串数组[roleId, roleId2]
 * @returns 
 */
export const grantRolesToAccount = (accountId, roleIds) => {
  const { data, error, loading } = usePutData(
    `/api/auth/v5/accounts/${accountId}/roles`,
    {roleIds: roleIds}
  );
  return { data, error, loading };
};

/**
 * 撤销账号角色
 * @param {*} accountId 
 * @param {*} roleIds 字符串数组[roleId, roleId2]
 * @returns 
 */
export const revokeRolesFromAccount = (accountId, roleIds) => {
  const { data, error, loading } = useDeleteData(
    `/api/auth/v5/accounts/${accountId}/roles`,
    {roleIds: roleIds}
  );
  return { data, error, loading };
};

/**
 * 获取某个账号的部门列表
 * @param {*} id
 * @returns {*} {datas:数组[{返回结果记录为字典}]}
 */
export const fetchAccountGroups = (accountId) => {
  const { data, error, loading } = useFetchData(
    `/api/auth/v5/accounts/${accountId}/groups`
  );
  return { data, error, loading };
};

/**
 * 授权部门给账号
 * @param {*} accountId 
 * @param {*} roleIds 字符串数组[groupId, groupId2]
 * @returns 
 */
export const grantGroupsToAccount = (accountId, groupIds) => {
  const { data, error, loading } = usePutData(
    `/api/auth/v5/accounts/${accountId}/groups`,
    {groupIds: groupIds}
  );
  return { data, error, loading };
};

/**
 * 撤销账号部门
 * @param {*} accountId 
 * @param {*} groupIds 字符串数组[groupId, groupId2]
 * @returns 
 */
export const revokeGroupsFromAccount = (accountId, groupIds) => {
  const { data, error, loading } = useDeleteData(
    `/api/auth/v5/accounts/${accountId}/groups`,
    {groupIds: groupIds}
  );
  return { data, error, loading };
};
import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/**
 * 查询策略列表
 * @param {*} page 当前页
 * @param {*} size 每页记录数
 * @param {*} orders 排序，数组[{'column':'name', 'dir':'asc'},{'column':'title', 'dir':'desc'}]
 * @param {*} searchs 过滤条件，数组[{'column':'name', 'op':'eq', 'value':'系统字典'}]
 * @returns {*} {currPage:当前页, pageSize:每页记录数, totalNum:总记录数, totalPage:总页数, datas:数组[{每条记录为字典},{}]}
 */
export const fetchPolicyList = (page, size, orders, searchs) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/policies/filter`, {
    page: page,
    size: size,
    orders: orders,
    searchs: searchs,
  });
  return { data, error, loading };
};

/**
 * 查询策略
 * @param {*} id 
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fetchPolicy = (id) => {
  const { data, error, loading } = useFetchData(`/api/auth/v5/policies/${id}`);
  return { data, error, loading };
};

/** 
 * 创建策略
 */
export const createPolicy = (priority, type, objId, objName, resPath, action, access) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/policies`, {
    priority: priority,
    type: type,
    objId: objId,
    objName: objName,
    resPath: resPath,
    action: action,
    access: access,
  });
  return { data, error, loading };
};

/** 
 * 修改策略
 */
export const modifyPolicy = (id, priority, type, objId, objName, resPath, action, access) => {
  const { data, error, loading } = usePutData(`/api/auth/v5/policies/${id}`, {
    priority: priority,
    type: type,
    objId: objId,
    objName: objName,
    resPath: resPath,
    action: action,
    access: access,
  });
  return { data, error, loading };
};

/** 
 * 删除策略
 */
export const removePolicy = (id) => {
  const { data, error, loading } = useDeleteData(`/api/auth/v5/policies/${id}`);
  return { data, error, loading };
};
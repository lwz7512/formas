import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/**
 * 查询菜单列表
 * @param {*} page 当前页
 * @param {*} size 每页记录数
 * @param {*} orders 排序，数组[{'column':'name', 'dir':'asc'},{'column':'title', 'dir':'desc'}]
 * @param {*} searchs 过滤条件，数组[{'column':'name', 'op':'eq', 'value':'系统字典'}]
 * @returns {*} {currPage:当前页, pageSize:每页记录数, totalNum:总记录数, totalPage:总页数, datas:数组[{每条记录为字典},{}]}
 */
export const fetchMenuList = (page, size, orders, searchs) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/menus/filter`, {
    page: page,
    size: size,
    orders: orders,
    searchs: searchs,
  });
  return { data, error, loading };
};

/**
 * 查询菜单树
 * @param {*} id 
 * @returns {*} {datas:数组[{每条记录为字典, "children":[每条记录为字典]},{}]}
 */
export const fetchMenuTree = (id) => {
  const { data, error, loading } = useFetchData(`/api/auth/v5/menus/${id}/tree`);
  return { data, error, loading };
};

/**
 * 查询菜单
 * @param {*} id 
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fetchMenu = (id) => {
  const { data, error, loading } = useFetchData(`/api/auth/v5/menus/${id}`);
  return { data, error, loading };
};

/** 
 * 创建菜单
 */
export const createMenu = (pid, name, path, icon, hideInMenu) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/menus`, {
    pid: pid,
    name: name,
    path: path,
    icon: icon,
    hideInMenu: hideInMenu,
  });
  return { data, error, loading };
};

/** 
 * 修改数据字典
 */
export const modifyMenu = (id, name, path, icon, hideInMenu) => {
  const { data, error, loading } = usePutData(`/api/auth/v5/menus/${id}`, {
    name: name,
    path: path,
    icon: icon,
    hideInMenu: hideInMenu,
  });
  return { data, error, loading };
};

/** 
 * 删除菜单
 */
export const removeMenu = (id) => {
  const { data, error, loading } = useDeleteData(`/api/auth/v5/menus/${id}`);
  return { data, error, loading };
};

/**
 * 移动树节点位置
 * @param {*} menuId 源节点ID
 * @param {*} objId 目标节点ID
 * @param {*} place 位置: before, after
 * @param {*} relation 关系：child, brother
 * @returns 
 */
export const moveMenu = (menuId, destId, place, relation) => {
  const { data, error, loading } = usePutData(`/api/auth/v5/menus/${menuId}/move`, {
    objId: objId,
    place: place,
    relation: relation,
  });
  return { data, error, loading };
};

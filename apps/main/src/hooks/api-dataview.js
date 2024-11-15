import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/**
 * 查询数据视图列表
 * @param {*} page 当前页
 * @param {*} size 每页记录数
 * @param {*} orders 排序，数组[{'column':'name', 'dir':'asc'},{'column':'title', 'dir':'desc'}]
 * @param {*} searchs 过滤条件，数组[{'column':'name', 'op':'eq', 'value':'系统字典'}]
 * @returns {*} {currPage:当前页, pageSize:每页记录数, totalNum:总记录数, totalPage:总页数, datas:数组[{每条记录为字典},{}]}
 */
export const fetchDataviewList = (page, size, orders, searchs) => {
  const { data, error, loading } = usePostData(`/api/dataview/list`, {
    page: page,
    size: size,
    orders: orders, // [{'column':'name', 'dir':'asc'},{'column':'title', 'dir':'desc'}]
    searchs: searchs, // [{'column':'name', 'op':'eq', 'value':'系统字典'}]
  });
  return { data, error, loading };
};

/**
 * 查询数据视图
 * @param {*} id 
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fetchDataview = (id) => {
  const { data, error, loading } = useFetchData(`/api/dataview/${id}`);
  return { data, error, loading };
};

/** 
 * 创建数据视图
 */
export const createDataview = (title, displayType) => {
  const { data, error, loading } = usePostData(`/api/dataview`, {
    title: title,
    displayType: displayType,
  });
  return { data, error, loading };
};

/** 
 * 修改数据视图
 */
export const modifyDataview = (id, title, displayType) => {
  const { data, error, loading } = usePutData(`/api/dataview/${id}`, {
    title: title,
    displayType: displayType,
  });
  return { data, error, loading };
};

/** 
 * 删除数据视图
 */
export const removeDataview = (id) => {
  const { data, error, loading } = useDeleteData(`/api/dataview/${id}`);
  return { data, error, loading };
};

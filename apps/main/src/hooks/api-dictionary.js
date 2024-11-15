import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/**
 * 查询数据字典列表
 * @param {*} page 当前页
 * @param {*} size 每页记录数
 * @param {*} orders 排序，数组[{'column':'name', 'dir':'asc'},{'column':'title', 'dir':'desc'}]
 * @param {*} searchs 过滤条件，数组[{'column':'name', 'op':'eq', 'value':'系统字典'}]
 * @returns {*} {currPage:当前页, pageSize:每页记录数, totalNum:总记录数, totalPage:总页数, datas:数组[{每条记录为字典},{}]}
 */
export const fetchDictionaryList = (page, size, orders, searchs) => {
  const { data, error, loading } = usePostData(`/api/sys/dictionaries/list`, {
    page: page,
    size: size,
    orders: orders,
    searchs: searchs,
  });
  return { data, error, loading };
};

/**
 * 查询数据字典
 * @param {*} id 
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fetchDictionary = (id) => {
  const { data, error, loading } = useFetchData(`/api/sys/dictionaries/${id}`);
  return { data, error, loading };
};

/** 
 * 创建数据字典
 */
export const createDictionary = (category, seq, value) => {
  const { data, error, loading } = usePostData(`/api/sys/dictionaries`, {
    category: category,
    seq: seq,
    value: value,
  });
  return { data, error, loading };
};

/** 
 * 修改数据字典
 */
export const modifyDictionary = (id, category, seq, value) => {
  const { data, error, loading } = usePutData(`/api/sys/dictionaries/${id}`, {
    category: category,
    seq: seq,
    value: value,
  });
  return { data, error, loading };
};

/** 
 * 删除数据字典
 */
export const removeDictionary = (id) => {
  const { data, error, loading } = useDeleteData(`/api/sys/dictionaries/${id}`);
  return { data, error, loading };
};
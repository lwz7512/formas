import httpClient from '../utils/http-client';

/**
 * 查询数据字典列表
 * @param {Object} params 查询参数
 * @param {number} params.current 当前页码
 * @param {number} params.pageSize 每页条数
 * @param {string} params.orderColumn 排序列（默认category）
 * @returns {Promise} 包含字典列表和分页信息的Promise
 */
export const fetchDictionaryList = async ({
  current = 1,
  pageSize = 100,
  orderColumn = 'category'
}) => {
  try {
    const response = await httpClient.post('/sys/dictionaries/filter', {
      currPage: current,
      pageSize: pageSize,
      orders: [{ column: orderColumn, dir: 'asc' }],
      searchs: []
    });
    return {
      list: response.datas.map(item => ({
        key: item.id,
        category: item.category,
        label: item.name,
        value: item.value,
        sequence: item.seq
      })),
      total: response.totalNum,
      current: response.currPage,
      pageSize: response.pageSize
    };
  } catch (error) {
    console.error('获取字典列表失败:', error);
    throw error;
  }
};

/**
 * 创建数据字典项
 * @param {Object} item 字典项数据
 * @param {string} item.category 分类
 * @param {string} item.label 显示名称
 * @param {string} item.value 值
 * @param {string} item.sequence 排序序号
 * @returns {Promise} 创建结果的Promise
 */
export const createDictionaryItem = async (item) => {
  try {
    const response = await httpClient.post('/sys/dictionaries', {
      category: item.category,
      name: item.label,
      value: item.value,
      seq: item.sequence
    });
    return response.data;
  } catch (error) {
    console.error('创建字典项失败:', error);
    throw error;
  }
};

/**
 * 更新数据字典项
 * @param {Object} item 字典项数据
 * @param {string} item.key 字典项ID
 * @param {string} item.category 分类
 * @param {string} item.label 显示名称
 * @param {string} item.value 值
 * @param {string} item.sequence 排序序号
 * @returns {Promise} 更新结果的Promise
 */
export const updateDictionaryItem = async (item) => {
  try {
    const response = await httpClient.put(`/sys/dictionaries/${item.key}`, {
      category: item.category,
      name: item.label,
      value: item.value,
      seq: item.sequence
    });
    return response.data;
  } catch (error) {
    console.error('更新字典项失败:', error);
    throw error;
  }
};

/**
 * 删除数据字典项
 * @param {string} id 字典项ID
 * @returns {Promise} 删除结果的Promise
 */
export const deleteDictionaryItem = async (id) => {
  try {
    const response = await httpClient.delete(`/sys/dictionaries/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除字典项失败:', error);
    throw error;
  }
};

/**
 * 数据字典Hook
 * @returns {Object} 包含字典列表、加载状态和操作方法
 */
export const useDictionary = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchList = async (params = {}) => {
    setLoading(true);
    try {
      const result = await fetchDictionaryList({
        current: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize
      });
      setList(result.list);
      setPagination(prev => ({
        ...prev,
        total: result.total,
        current: result.current,
        pageSize: result.pageSize
      }));
    } catch (error) {
      console.error('获取字典列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item) => {
    try {
      await createDictionaryItem(item);
      await fetchList(); // 创建后刷新列表
    } catch (error) {
      throw error;
    }
  };

  const updateItem = async (item) => {
    try {
      await updateDictionaryItem(item);
      await fetchList(); // 更新后刷新列表
    } catch (error) {
      throw error;
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDictionaryItem(id);
      await fetchList(); // 删除后刷新列表
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return {
    list,
    loading,
    pagination,
    fetchList,
    createItem,
    updateItem,
    deleteItem
  };
};
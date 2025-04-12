import httpClient from '../utils/http-client';

// 数据源列表查询
export const fetchDataSourceList = async (params) => {
  try {
    const response = await httpClient.post('/formas/datasources/filter', {
      currPage: params.currPage,
      pageSize: params.pageSize,
      orders: [{column:"title",dir:"asc"}],
      searchs: [],
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('获取数据源列表失败:', error);
    throw error;
  }
};

// 创建数据源
export const createDataSource = async item => {
  try {
    const response = await httpClient.post('/formas/datasources', {
      ...item,
      isDefault: item.isDefault ? 1 : 0,
    });
    return response.data;
  } catch (error) {
    console.error('创建数据源失败:', error);
    throw error;
  }
};

// 更新数据源
export const updateDataSource = async item => {
  try {
    const response = await httpClient.put(`/formas/datasources/${item.id}`, {
      ...item,
      isDefault: item.isDefault ? 1 : 0,
    });
    return response.data;
  } catch (error) {
    console.error('更新数据源失败:', error);
    throw error;
  }
};

// 删除数据源
export const deleteDataSource = async id => {
  try {
    const response = await httpClient.delete(`/formas/datasources/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除数据源失败:', error);
    throw error;
  }
};

// 测试数据源连接
export const testDataSourceConnection = async id => {
  try {
    const response = await httpClient.post(
      `/formas/datasources/${id}/query-one`,
      {
        sqlStmt: 'SELECT 1 AS a FROM DUAL',
      }
    );
    return response.data;
  } catch (error) {
    console.error('测试连接失败:', error);
    throw error;
  }
};

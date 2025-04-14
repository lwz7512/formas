import httpClient from '@/utils/http-client';

// 数据源列表查询
export const fetchDataSourceList = async params => {
  const response = httpClient.post('/formas/datasources/filter', {
    currPage: params.currPage || 1,  // 默认第一页
    pageSize: params.pageSize || 10, // 默认每页10条
    orders: [{ column: 'title', dir: 'asc' }],
  });
  return response;
}

// 创建数据源
export const createDataSource = async item => {
  const response = await httpClient.post('/formas/datasources', {
    ...item,
    isDefault: item.isDefault ? 1 : 0,
  });
  return response.data;
};

// 更新数据源
export const updateDataSource = async item => {
  const response = await httpClient.put(`/formas/datasources/${item.id}`, {
    ...item,
    isDefault: item.isDefault ? 1 : 0,
  });
  return response.data;
};

// 删除数据源
export const deleteDataSource = async id => {
  const response = await httpClient.delete(`/formas/datasources/${id}`);
  return response.data;
};

// 测试数据源连接
export const testDataSourceConnection = async id => {
  const response = await httpClient.post(
    `/formas/datasources/${id}/query-one`,
    {
      sqlStmt: 'SELECT 1 AS a FROM DUAL',
    }
  );
  return response.data;
};

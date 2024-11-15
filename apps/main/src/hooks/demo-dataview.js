import React, { useState, useEffect } from 'react';
import { fetchDataviewList } from './api';

const DataviewList = () => {
  // 定义状态变量
  const [dataviews, setDataviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 设置加载状态
    setIsLoading(true);

    // 调用业务API获取数据
    fetchDataviewList(1, 10, 'asc', 'keyword').then(({ data, error, loading }) => {
      // 更新状态变量
      setDataviews(data);
      setError(error);
      setIsLoading(loading);
    }).catch((error) => {
      // 处理错误
      setError(error);
      setIsLoading(false);
    });
  }, []); // 空依赖数组表示只在组件挂载时执行

  // 根据状态渲染组件
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {dataviews.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default DataviewList;

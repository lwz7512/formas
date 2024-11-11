import React from 'react';
import useFetchData from './useFetchData'; // 假设上面的代码保存在 useFetchData.js 文件中

const MyComponent = () => {
  const { data, error, loading } = useFetchData('https://api.example.com/data', { userId: '123', limit: 10 });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default MyComponent;

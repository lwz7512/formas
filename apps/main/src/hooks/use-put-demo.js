import React, { useState } from 'react';
import usePutData from './usePutData'; // 假设上面的代码保存在 usePutData.js 文件中

const MyPutComponent = () => {
  const { data, error, loading, putData } = usePutData('https://api.example.com/data/123');
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putData(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit" disabled={loading}>
          Update
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Updated data: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default MyPutComponent;

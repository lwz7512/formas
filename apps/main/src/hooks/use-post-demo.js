import React, { useState } from 'react';
import usePostData from './usePostData'; // 假设上面的代码保存在 usePostData.js 文件中

const MyPostComponent = () => {
  const { data, error, loading, postData } = usePostData('https://api.example.com/data');
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData(formData);
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
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Submitted data: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default MyPostComponent;

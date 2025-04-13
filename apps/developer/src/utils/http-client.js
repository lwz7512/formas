import axios from 'axios';
import { message } from 'antd';
import { SERVICE_GATE_API as host } from '@/config';

// 创建 axios 实例
const httpClient = axios.create({
  baseURL: host + '/api',
  timeout: 10000,
});

// 请求拦截器 - 添加 token
httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('formas.jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 统一错误处理
httpClient.interceptors.response.use(
  response => {
    // 如果后端返回 errCode 非 200，视为错误
    if (response.data?.errCode !== undefined && response.data.errCode !== 200) {
      return Promise.reject(
        new Error(response.data.errMsg || 'Request failed')
      );
    }
    return response.data;
  },
  error => {
    message.error(error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default httpClient;

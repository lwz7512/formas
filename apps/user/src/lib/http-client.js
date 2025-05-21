import axios from 'axios';
import { message } from 'antd';
import { SERVICE_GATE_API as host } from '@/config';

const httpClient = axios.create({
  baseURL: host + '/api',
  timeout: 10000,
});

// 请求拦截器
httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('formas.jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
httpClient.interceptors.response.use(
  response => {
    // 成功响应但业务错误（errCode非200）
    if (response.data?.errCode !== undefined && response.data.errCode !== 200) {
      const error = new Error(response.data.errMsg || 'Request failed');
      error.code = response.data.errCode;
      console.error('API Business Error:', error); // 确保错误被记录
      message.error(response.data.errMsg || 'Request failed');
      return Promise.reject(error);
    }
    return response.data;
  },
  error => {
    // 网络或服务器错误
    const errorMessage =
      error.response?.data?.message || error.message || 'Network Error';

    console.error('HTTP Error:', {
      // 结构化日志
      config: error.config,
      status: error.response?.status,
      data: error.response?.data,
      message: errorMessage,
    });

    message.error(errorMessage);
    return Promise.reject(error);
  }
);

export default httpClient;

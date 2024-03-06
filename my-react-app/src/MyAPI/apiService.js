const BASE_URL = 'http://localhost:8000/api/';

// 假設你的JWT儲存在localStorage中
const getAuthToken = () => localStorage.getItem('token');

// 通用的fetch函數，現在包含Authorization標頭
const fetchApi = async (endpoint, options = {}) => {
  const token = getAuthToken(); // 從某處獲取JWT
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}), // 如果有token，則添加Authorization標頭
    },
  });
  if (!response.ok) {
    throw new Error('API call failed');
  }
  return response.json();
};

// 獲取資源，使用JWT
export const fetchResource = async () => {
  return fetchApi('Home/GetAll');
};

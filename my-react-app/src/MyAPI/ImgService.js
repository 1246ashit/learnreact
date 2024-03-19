const BASE_URL = 'http://localhost:5259/api/';

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
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.startsWith('image/')) {
    const imageSha = response.headers.get('x-image-sha');
    const blob = await response.blob(); // 回應體可以轉換為 Blob
    const imgURL = URL.createObjectURL(blob);
    console.log(imageSha);
    return { imgURL, imageSha };
  } else {
    return response.json();
  }
};


export const GetImgPath = async (id) => {
  return fetchApi(`ImageCRUD/GetImgPath?UID=${id}`);
};

export const GetImg = async (imagePath) => {
  return fetchApi(`ImageCRUD/GetImage?imagePath=${imagePath}`);
};

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
  return fetchApi(`ImageCRUD/GetImgPath?user_id=${id}`);
};

export const GetImg = async (image_path) => {
  return fetchApi(`ImageCRUD/GetImage?imagePath=${image_path}`);
};

export const PostImage = async (userId, file) => {
  const formData = new FormData();
  formData.append('file', file); // 確保這裡的 'file' 是您服務器端期望的字段名稱

  try {
    const response = await fetch(`http://localhost:5259/api/ImageCRUD/PostImage?user_id=${userId}`, {
      method: 'POST',
      headers: {
        'accept': '*/*', // 這裡可以接受任何類型的回應
      },
      body: formData, // FormData 實例作為請求主體
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.text(); // 假設服務器回傳 JSON，如果不是請改為 response.text() 或其他合適的方法
    return result;

  } catch (error) {
    console.error('Error during API call:', error);
    throw error; // 可能想要在這裡處理錯誤或將其傳遞給呼叫者
  }
};


export const deleteImage = async (userId, imagePath, imageSha) => {
  try {
    const response = await fetch('http://localhost:5259/api/ImageCRUD/DeleteImage', {
      method: 'DELETE', // 設置請求方法為 DELETE
      headers: {
        'Content-Type': 'application/json', // 請求內容類型為 JSON
        'accept': '*/*', // 接受所有類型的響應
      },
      body: JSON.stringify({ // 把物件轉換為 JSON 字串
        user_id: userId,
        path: imagePath,
        sha: imageSha,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    console.log('File deleted successfully.');
    return await response.text(); // 或者根據您的API，這裡可能需要改為 response.json()

  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
};



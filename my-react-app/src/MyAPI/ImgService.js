// 假設你的JWT儲存在localStorage中
const getAuthToken = () => localStorage.getItem('token');

export const GetImgPath = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5259/api/Img2/GetFile?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error fetching the image path", error);
  }
};

export const SaveImgPath = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('formFile', file, file.name); // 注意欄位名稱是 'formFile'
    formData.append('type', file.type); // 添加 MIME 類型

    const response = await fetch(`http://localhost:5259/api/Img2/SendFile?user_id=${userId}`, {
      method: 'POST',
      // 在這裡，我們不設定 headers，因為 FormData 會自動設定 Content-Type 為 multipart/form-data 並包含 boundary 參數
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true; // 或者是其他的成功訊息
  } catch (error) {
    console.error(error);
    return false;
  }
};

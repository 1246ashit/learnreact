export async function Getfile(userid, page) {
  const url = `http://localhost:5259/api/Img2/GetFile?user_id=${userid}&page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = response.json();
    //console.log('GetfileFu Successful:', responseData);
    return responseData;
  } catch (error) {
    console.error('GetfileFu Failed:', error);
    return null;
  }
}




export async function GetfilePath(media_id, image_name, media_type, m3u8_id, m3u8_path) {
  const url = `http://localhost:5259/api/Img2/GetFilePath`;

  // 根據 API 要求設置 POST 請求的 Body 內容
  const requestBody = {
    media_id: media_id,
    image_name: image_name,
    media_type: media_type,
    m3u8_id: m3u8_id,
    m3u8_path: m3u8_path
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody) // 正確地將請求體轉換為 JSON 字串
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json(); // 確保使用 await 處理 promise
    //console.log('GetfilePath Successful:', responseData);
    return responseData;
  } catch (error) {
    console.error('GetfilePath Failed:', error);
    return null;
  }
}



export async function GetStreamVideo(userid, m3u8_path, m3u8_id) {
  const url = `http://localhost:5259/api/Stream/StreamVideo`;

  const requestBody = {
    userid: userid,
    m3u8_path: m3u8_path,
    m3u8_id: m3u8_id
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.apple.mpegurl',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const m3u8Content = await response.text();
    //console.log("m3u8Content",m3u8Content);
    const blob = new Blob([m3u8Content], { type: 'application/x-mpegURL' });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  } catch (error) {
    console.error('Failed to get video stream:', error);
    return null;
  }
}






export async function DeleteFile(userid, imageName) {
  const url = `http://localhost:5259/api/Img2/DeleteFile?user_id=${userid}&image_name=${imageName}`;

  try {
    const response = await fetch(url, {
      method: 'GET' // 修改 HTTP 方法為 DELETE
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text(); // 獲取回應文本
    console.log('DeleteFile Successful:', text); // 日誌打印成功訊息
    return text; // 返回操作結果
  } catch (error) {
    console.error('Failed to DeleteFile:', error);
    return null;
  }
}




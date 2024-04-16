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



export async function GetfilePath(media_id, image_name, media_type) {
  const url = `http://localhost:5259/api/Img2/GetFilePath?media_id=${media_id}&image_name=${image_name}&media_type=${media_type}`;

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
    //console.log('GetfilePath Successful:', responseData);
    return responseData;
  } catch (error) {
    console.error('GetfilePath Failed:', error);
    return null;
  }
}





export async function GetStreamVideo(userFileName, chunkpaths) {
  const url = `http://localhost:5259/api/Stream/StreamVideo?userFileName=${userFileName}`;

  // 根據 API 要求設置 POST 請求的 Body 內容
  const requestBody = {
    chunkpaths:chunkpaths, // 此處假設 chunkPaths 是一個包含所有 chunk URL 的陣列
    userFileName:userFileName
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'video/mp4',  // 明確期望回應的類型為影片
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody) // 請求的內容需轉為 JSON 字串
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 將回應的資料流轉換為 blob
    const blob = await response.blob();
    // 創建一個 blob URL，這個 URL 可以被 video 元素使用
    const blobUrl = URL.createObjectURL(blob);
    console.log('Blob URL created:', blobUrl);
    return blobUrl;
  } catch (error) {
    console.error('Failed to get video stream:', error);
    return null;
  }
}

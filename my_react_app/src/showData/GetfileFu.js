export async function Getfile(userid,page) {
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



  export async function GetfilePath(media_id,image_name,media_type) {
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
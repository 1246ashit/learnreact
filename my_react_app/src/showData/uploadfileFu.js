export async function uploadFile(userId, durationseconds, file) {
  const url = `http://localhost:5259/api/Img2/SendFile?userId=${userId}&durationseconds=${durationseconds}`;

  const formData = new FormData();
  formData.append('formFile', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('uploadFile Successful:', responseText);
    return responseText;
  } catch (error) {
    console.error('uploadFile Failed:', error);
    return null;
  }
}

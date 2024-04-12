export async function LoginFu(username, password) {
    const url = 'http://localhost:5259/api/Home/Login';
    const requestBody = {
      username: username,
      password: password
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = response.json();
      console.log('Login Successful:', responseData);
      return responseData;
    } catch (error) {
      console.error('Login Failed:', error);
      return null;
    }
  }
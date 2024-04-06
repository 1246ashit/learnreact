import React, { useState } from 'react'; // 移除重複的導入

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5259/api/Home/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // 直接讀取文本響應，因為後端返回純JWT字符串

      if (response.ok) {
        //console.log('提交成功, Token:', data);
        localStorage.setItem('token', data.token); // 儲存JWT到localStorage
        localStorage.setItem('id', data.id);
        // 刷新頁面
        window.location.reload();
      } else {
        // 處理錯誤情況
        console.error('提交失敗:', data);
      }
    } catch (error) {
      console.error('提交過程中發生錯誤:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-50">
      <div className="flex flex-col justify-center p-8 md:p-14">
        <span className="mb-3 text-4xl font-bold">歡迎回來!!</span>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label htmlFor="username" className="mb-2 text-md">帳號:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange} />
          </div>
          <div className="py-4">
            <label className="mb-2 text-md" htmlFor="password">密碼:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange} />
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            type="submit">提交</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

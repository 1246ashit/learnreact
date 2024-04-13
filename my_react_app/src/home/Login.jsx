//圖案套件
import { BiSolidLogIn } from "react-icons/bi";
//
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
//api
import { LoginFu } from "./LoginFu";
//

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 使用 useNavigate 鉤子


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
    const response = await LoginFu(username, password)
    if (response && response.token && response.id) {
      // 儲存 token 和 user_id 到 localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('userid', response.id);
      console.log('Login successful');
      // 可以加入頁面跳轉或狀態更新的邏輯
      navigate('/ShowImage');
    } else {
      console.log('No token or userId received');
    }
  } catch (error) {
    console.error('Login Failed:', error);
  }

};

return (
  <div className='flex h-screen bg-black'>
    <div className='flex-1 flex items-center justify-center'>
    </div>
    <div className='flex-1 flex flex-col items-center justify-center bg-gray-100 bg-opacity-50'>
      <p className='font-bold text-4xl py-4'>
        歡迎回來!!
      </p>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-lg"
        />
        <div type="submit" className="flex px-4 py-2 items-center justify-center bg-blue-500 hover:bg-blue-800 text-white rounded-lg cursor-pointer"
          onClick={handleLogin}>
          登入 <BiSolidLogIn />
        </div>
      </form>
    </div>
    <div className='flex-1 flex items-center justify-center'>
    </div>
  </div>
);
}

export default Login;

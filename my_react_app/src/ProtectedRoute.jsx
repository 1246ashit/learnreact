import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const userid = localStorage.getItem('userid');
  console.log("userid:"+userid)
  if (!userid ) {
    // 如果 userId 不存在，重定向到登入頁面
    return <Navigate to="/" replace />;
  }

  // 如果 userId 存在，渲染目標組件
  return element;
}

export default ProtectedRoute;

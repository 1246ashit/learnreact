import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { CiCirclePlus,CiLogout } from "react-icons/ci";
function Navbar () {
    const home=useNavigate()
    function ToHome(){
        home('/');
    }
    const AddHero=useNavigate()
    function ToAddHero(){
        AddHero('/AddHero')
    }
    function ToLogout(){
        // 刪除存儲的token
        localStorage.removeItem('token');
        // 刷新頁面
        window.location.reload();
    }

    return (
        <div className="flex flex-col justify-between items-start w-1/4 h-screen fixed left-0">
        <nav className="bg-gray-800 text-white p-4 w-1/4 h-screen fixed"> 
                <div style={{ marginLeft: '20%' }}>
                    <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={ToHome}>
                        <FaHome size={40}/>
                        <div className="text-lg font-bold hover:text-gray-300">我的梗圖</div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={ToLogout}>
                            <CiLogout size={40}/>
                            <div className="text-lg font-semibold hover:text-gray-300">登出</div>
                            
                        </div>
                    </div>
                </div>
        </nav>
    </div>
    );
};
export default Navbar;
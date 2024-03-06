import React, { useEffect, useState } from 'react';
import HeroList from "./IndexPage/HeroList.jsx"
import LoginPage from "./IndexPage/LoginPage.jsx";
import Navbar from './IndexPage/Navbar.jsx';

function App() {
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        document.title = "沃特國際企業";
        // 檢查localStorage中是否有token
        const token = localStorage.getItem('token');
        if (token) {
            setUserExists(true); // 如果有token，設置userExists為true
        }
    }, []); // 傳入空依賴數組，以確保這段代碼只在組件掛載時執行一次

    return (
        <div className="flex items-center justify-center min-h-screen bg-image">
            {userExists ? (
                <div className="flex min-h-screen">
                    <Navbar />
                    <HeroList/>
                </div>
            ) : (
                <LoginPage></LoginPage>
            )}
        </div>
    );
}

export default App;

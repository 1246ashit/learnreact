import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaGear } from "react-icons/fa6";

function CardOption(props) {
    const imageSha = props.imageSha;
    const imagePath = props.imagePath;
    const user_id=localStorage.getItem('id');
    const [showOptions, setShowOptions] = useState(false);
    const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 });
    const gearIconRef = useRef(null); // 用於引用齒輪圖標的DOM元素

    // 計算並更新選項菜單的位置
    const updateOptionsPosition = () => {
        if (gearIconRef.current) {
            const rect = gearIconRef.current.getBoundingClientRect();
            setOptionsPosition({
                top: rect.top + window.scrollY + rect.height, // 添加window.scrollY以支持滾動
                left: rect.left + window.scrollX
            });
        }
    };

    useEffect(() => {
        // 監聽窗口大小變化
        window.addEventListener('resize', updateOptionsPosition);

        // 組件卸載時移除監聽器
        return () => {
            window.removeEventListener('resize', updateOptionsPosition);
        };
    }, []);

    // 點擊齒輪圖標時顯示選項菜單並計算位置
    const toggleOptions = () => {
        setShowOptions(!showOptions);
        updateOptionsPosition();
    };

    const handleDelete = async () => {
        console.log("來自handleDelete的ID:"+imageSha+",要刪除的path:"+imagePath+"目前登陸者:"+user_id)
      };

    // 選項菜單內容
    const optionsContent = (
        <div style={{ position: 'absolute', top: `${optionsPosition.top}px`, left: `${optionsPosition.left}px`, zIndex: 50 }} className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
            <a onClick={handleDelete} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">刪除</a>
        </div>
    );

    return (
        <>
            <div ref={gearIconRef} onClick={toggleOptions} className="cursor-pointer" style={{marginLeft:"95%"}}>
                <FaGear size={30}/>
                {showOptions && ReactDOM.createPortal(optionsContent, document.body)}
            </div>
        </>
    );
}

export default CardOption;

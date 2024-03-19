import React, { useState, useRef, useEffect } from 'react';
import { FaList } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

function NewCard(props) {
    // 定義一個 state 來儲存選擇的檔案陣列
    const [selectedFiles, setSelectedFiles] = useState([]);
    // 定義一個 state 來控制清單的顯示和隱藏
    const [showFileList, setShowFileList] = useState(false);
    // 取得按鈕的參考
    const buttonRef = useRef(null);

    // 處理檔案選擇的事件
    const handleFileChange = (event) => {
        // 取得選擇的檔案並轉換成陣列
        const files = Array.from(event.target.files);
        // 更新 state 以添加新選擇的檔案
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };

    // 印出待上傳檔案的函式
    const printSelectedFiles = () => {
        return selectedFiles.map((file, index) => (
            <div key={index} className="mt-2">待上傳檔案：{file.name}</div>
        ));
    };

    // 切換清單顯示狀態的函式
    const toggleFileList = () => {
        setShowFileList(!showFileList);
    };

    // 使用 useEffect 來設定清單的位置
    useEffect(() => {
        if (showFileList && buttonRef.current) {
            const button = buttonRef.current;
            const fileList = document.querySelector(".fileList");

            if (fileList) {
                // 計算 fileList 的新位置
                const topPosition = button.offsetTop + button.offsetHeight; // 按鈕底部的位置
                const leftPosition = button.offsetLeft + button.offsetWidth; // 按鈕右邊的位置

                // 設定 fileList 的樣式
                fileList.style.position = 'absolute';
                fileList.style.top = `${topPosition}px`;
                fileList.style.left = `${leftPosition}px`;
            }
        }
    }, [showFileList, buttonRef]);

    return (
        <div className="mx-auto w-full md:w-1/2 p-4 relative">
            <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 h-auto flex flex-col items-center relative min-h-32">
                <div className="border-4 border-dashed rounded px-5 md:px-20 lg:px-40 py-8 cursor-pointer relative"
                    onClick={() => document.querySelector(".inputFile").click()}>
                    <input type="file" className="inputFile" onChange={handleFileChange} hidden multiple />
                    給我新梗圖!!
                </div>
                {/* 圖標的容器使用絕對定位 */}
                <div className="absolute bottom-0 right-0 mb-4 mr-4">
                    {/* 這個 div 將包含 BsFillSendFill 圖標 */}
                    <div className="cursor-pointer text-black" style={{ fontSize: '20px' }}>
                        <BsFillSendFill />
                    </div>
                    {/* 這個 div 將包含 FaList 圖標 */}
                    <div ref={buttonRef} onClick={toggleFileList} className="cursor-pointer text-black ml-2" style={{ fontSize: '20px' }}>
                        <FaList />
                    </div>
                </div>

                {/* 使用絕對定位來顯示清單 */}
                <div className="fileList absolute bg-white border border-gray-200 p-2 rounded shadow-md" style={{ display: showFileList ? 'block' : 'none' }}>
                    {printSelectedFiles()}
                </div>
            </div>
        </div>
    );
}

export default NewCard;

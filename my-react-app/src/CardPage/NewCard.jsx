import React, { useState, useRef, useEffect } from 'react';
import { FaList } from "react-icons/fa6";
import { BsFillSendFill ,BsFillTrash2Fill } from "react-icons/bs";

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

    const deleteFile = (indexToDelete) => {
        setSelectedFiles(currentFiles => currentFiles.filter((_, index) => index !== indexToDelete));
    };

    const toggleFileList = () => {
        setShowFileList(!showFileList);
    };

    // 印出待上傳檔案的函式
    // 調整 printSelectedFiles 以僅返回元素
    const printSelectedFiles = () => {
        return selectedFiles.length > 0 ? selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-start mt-2 truncate font-serif hover:bg-gray-300">
                <div onClick={() => deleteFile(index)} className="cursor-pointer">
                    <BsFillTrash2Fill />
                </div>
                {file.name}
            </div>
        )) : <div className='flex items-center justify-center font-bold'>空空如也~~~</div>;
    };


    // 設定清單的位置
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
            <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 h-40 flex flex-col items-center">
                <div className="border-4 border-dashed rounded mt-4 px-5 md:px-20 lg:px-40 py-8 cursor-pointer relative"
                    onClick={() => document.querySelector(".inputFile").click()}>
                    <input type="file" className="inputFile" onChange={handleFileChange} hidden multiple />
                    <span className='font-bold'>給我新梗圖!!</span>
                </div>
                <div className="flex items-center justify-end space-x-4 m-4 ml-96">
                    <div className="cursor-pointer">
                        <BsFillSendFill size={20} />
                    </div>
                    <div ref={buttonRef} onClick={toggleFileList} className="cursor-pointer">
                        <FaList size={20} />
                    </div>
                    <div className="fileList overflow-auto absolute bg-white border border-gray-200 mt-2 p-2 rounded shadow-md min-h-20 max-h-40 w-80" style={{ display: showFileList ? 'block' : 'none' }}>
                        {printSelectedFiles()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCard;

import React, { useState } from 'react';
import { BsFillSendFill } from "react-icons/bs";

function NewCard(props) {
    // 定義一個 state 來儲存選擇的檔案陣列
    const [selectedFiles, setSelectedFiles] = useState([]);

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

    

    return (
        <div className="mx-auto w-full md:w-1/2 p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 h-40 flex justify-center items-center cursor-pointer"
             onClick={() => document.querySelector(".inputFile").click()}>
                <input type="file" className="inputFile" onChange={handleFileChange} hidden multiple />
                <div className="border-4 border-dashed rounded px-5 md:px-20 lg:px-40 py-8">
                    給我新梗圖!!
                </div>
                <div>
                    <BsFillSendFill />
                </div>
                {/* 印出待上傳的檔案 */}
                {/*printSelectedFiles()*/}
            </div>
        </div>
    );
}

export default NewCard;

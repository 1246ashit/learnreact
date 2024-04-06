import React, { useState, useRef, useEffect } from 'react';
import { FaList } from "react-icons/fa6";
import { BsFillSendFill, BsFillTrash2Fill } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { PostImage } from "../MyAPI/ImgService"

function NewCard(props) {
    const [files, setFiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

    const handleImageChange = (e) => {
        e.preventDefault();

        // 更新檔案列表
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        // 重置當前索引
        setCurrentIndex(0);

        // 讀取所有選擇的檔案並更新預覽URLs
        const fileReaders = selectedFiles.map((file) => {
            return new Promise((resolve) => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    resolve(reader.result);
                };

                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then((urls) => {
            setImagePreviewUrls(urls);
        });
    };

    const nextImage = () => {
        if (currentIndex < files.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const uploadImages = async () => {
        // 假設userId從props或其他方式獲得
        const userId = localStorage.getItem('id'); // 請根據實際情況替換
        let uploadSuccessful = true; // 假設所有上傳都將成功

        for (let file of files) {
            try {
                const result = await PostImage(userId, file);
                console.log(result); // 處理上傳成功的情況
            } catch (error) {
                console.error('上傳失敗:', error); // 處理上傳失敗的情況
                uploadSuccessful = false; // 至少有一個文件上傳失敗
            }
        }

        if (uploadSuccessful) {
            window.location.reload(); // 所有文件嘗試上傳後，如果都成功了，則刷新頁面
        }
    };




    return (
        <div className="p-4 w-3/5 relative select-none" style={{ marginLeft: '25%' }} >
            <div className="bg-white shadow-md rounded-lg overflow-hidden m-4">
                <div className="flex flex-col items-center justify-center min-h-40">
                    {imagePreviewUrls.length === 0 ? (
                        <div className="border-4 border-dashed rounded mt-4 px-5 md:px-20 lg:px-40 py-8 cursor-pointer relative flex flex-col items-center justify-center"
                            onClick={() => document.querySelector(".inputFile").click()}>
                            <input className="inputFile" type="file" onChange={handleImageChange} hidden multiple />
                            <span className='font-bold'>給我新梗圖!!</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between  w-full">
                            <div onClick={prevImage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer">

                                <IoIosArrowBack />
                            </div>
                            <div className="flex justify-center p-4" onClick={() => document.querySelector(".inputFile1").click()}>
                                <input className="inputFile1" type="file" onChange={handleImageChange} hidden multiple />
                                {imagePreviewUrls[currentIndex] && (
                                    <img src={imagePreviewUrls[currentIndex]} alt="Image Preview" className="max-w-xs max-h-48 mx-4" />
                                )}
                            </div>
                            <div onClick={nextImage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer">
                                <IoIosArrowForward />
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className="cursor-pointer p-4 mr-4 " style={{marginLeft:"85%"}}
                    onClick={uploadImages}>
                    <BsFillSendFill size={30}/>
                </div>
            </div>
        </div>
    );
}

export default NewCard;

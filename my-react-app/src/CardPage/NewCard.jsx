import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import { SaveImgPath } from '../MyAPI/ImgService';

function NewCard() {
    const [files, setFiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        e.preventDefault();

        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setCurrentIndex(0);

        const fileReaders = selectedFiles.map(file => {
            return new Promise(resolve => {
                const reader = new FileReader();

                reader.onloadend = () => resolve({ url: reader.result, type: file.type });
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then(files => {
            setPreviewUrls(files);
        });
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex < files.length - 1 ? prevIndex + 1 : prevIndex));
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const uploadFiles = async () => {
        const userId = localStorage.getItem('id');
        let uploadSuccessful = true;

        if (files.length === 0) {
            console.log("沒有選擇檔案");
            uploadSuccessful = false;
            return;
        }

        let uploadedCount = 0;

        for (const file of files) {
            console.log(file.name);
            try {
                const response = await SaveImgPath(userId, file, (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setUploadProgress((uploadedCount + progress / files.length).toFixed(2));
                });
                if (!response) {
                    uploadSuccessful = false;
                    console.error("File upload failed", file.name);
                    break;
                }
                uploadedCount += 1;
                setUploadProgress((uploadedCount / files.length) * 100);
            } catch (error) {
                console.error("Error uploading file", file.name, error);
            }
        }

        if (uploadSuccessful) {
            console.log("所有檔案上傳成功");
            window.location.reload()
        } else {
            console.log("一個或多個檔案上傳失敗");
        }
    };

    const renderPreview = () => {
        const currentFile = previewUrls[currentIndex];
        if (!currentFile) return null;

        return currentFile.type.startsWith('video/') ? (
            <video controls src={currentFile.url} className="max-w-xs max-h-48 mx-4"></video>
        ) : (
            <img src={currentFile.url} alt="Preview" className="max-w-xs max-h-48 mx-4" />
        );
    };

    return (
        <div className="p-4 w-3/5 relative select-none" style={{ marginLeft: '25%' }}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden m-4">
                <div className="flex flex-col items-center justify-center min-h-40">
                {previewUrls.length === 0 ? (
                        <div className="border-4 border-dashed rounded mt-4 px-5 md:px-20 lg:px-40 py-8 cursor-pointer relative flex flex-col items-center justify-center"
                            onClick={() => document.querySelector(".inputFile").click()}>
                            <input className="inputFile" type="file" onChange={handleFileChange} hidden multiple />
                            <span className='font-bold'>上傳圖片或影片</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <div onClick={prevImage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer">
                                <IoIosArrowBack />
                            </div>
                            <div className="flex justify-center p-4" onClick={() => document.querySelector(".inputFile1").click()}>
                                <input className="inputFile1" type="file" onChange={handleFileChange} hidden multiple />
                                {renderPreview()}
                            </div>
                            <div onClick={nextImage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer">
                                <IoIosArrowForward />
                            </div>
                        </div>
                    )}
                </div>
                <div className="my-2">
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                            <div className="text-center text-sm font-medium mt-2">
                                上傳中...
                            </div>
                        </>
                    )}
                </div>
                <div
                    className="cursor-pointer p-4 mr-4 " style={{ marginLeft: "85%" }}
                    onClick={uploadFiles}>
                    <BsFillSendFill size={30} />
                </div>
            </div>
        </div>
    );
}

export default NewCard;

import React, { useState } from 'react';
import { IoCloudUpload } from "react-icons/io5";

function NewCard() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        const filePreviews = newFiles.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve({ src: reader.result, type: file.type });
                };
            });
        });

        Promise.all(filePreviews).then(previews => {
            setFiles(previews);
        });
    };

    return (
        <>
            <div className='flex flex-col w-4/5  items-center justify-center rounded-xl bg-purple-600 mt-4' style={{ height: "480px" }}>
                {files.length === 0 ? (
                    <div className="w-10/12 h-56 flex items-center justify-center border-4 border-dashed border-white p-4 mt-4 mb-10 cursor-pointer"
                        onClick={() => document.getElementById('fileInput').click()}>
                        上傳圖片或影片
                        <input type="file" id="fileInput" multiple onChange={handleFileChange} accept="image/*,video/*" style={{ display: 'none' }} />
                    </div>
                ) : (
                    <>
                        <div className="w-10/12 max-h-80 overflow-y-auto flex flex-col items-center mt-4 mb-4 space-y-4 p-4 cursor-pointer "
                            onClick={() => document.getElementById('fileInput').click()}>
                            <input type="file" id="fileInput" multiple onChange={handleFileChange} accept="image/*,video/*" style={{ display: 'none' }} />
                            {files.map((file, index) => (
                                <div key={index} className="min-w-[40%]">
                                    {file.type.startsWith('image') ? (
                                        <img src={file.src} alt="Preview" className="rounded-lg" />
                                    ) : (
                                        <video controls src={file.src} className="rounded-lg" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center justify-center w-1/6 h-12 rounded-xl bg-orange-600 hover:bg-orange-800 cursor-pointer mb-4'>
                            <IoCloudUpload size={"30px"} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default NewCard;

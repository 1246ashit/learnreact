import React, { useState } from 'react';
import { IoCloudUpload } from "react-icons/io5";
import { uploadFile } from './uploadfileFu';
import ProgressBars from './ProgressBars';

function NewCard() {
    const [files, setFiles] = useState([]);
    const userid = localStorage.getItem('userid');
    const [uploadState,setuploadState]=useState(false)

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        const filePreviews = newFiles.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    if (file.type.startsWith('video')) {
                        const video = document.createElement('video');
                        video.src = URL.createObjectURL(file);
                        video.addEventListener('loadedmetadata', () => {
                            //console.log(`影片時長：${Math.ceil(video.duration)} 秒`); // 顯示影片時長，並無條件進位
                            resolve({ src: reader.result,
                                        type: file.type,
                                        duration: Math.ceil(video.duration),
                                        file: file  });
                        });
                    } else {
                        resolve({ src: reader.result, 
                                    type: file.type, 
                                    duration: 0,
                                    file: file });
                    }
                };
            });
        });

        Promise.all(filePreviews).then(previews => {
            setFiles(previews);
        });
    };

    const upload = async () => {
        setuploadState(true)
        for (const file of files) {
            try {
                const response = await uploadFile(userid, file.duration, file.file);
                console.log('上傳成功', response);
                // 檢查是否所有檔案都上傳成功後再重新整理頁面
                if (file === files[files.length - 1]) {
                    window.location.reload();  // 刷新页面
                }
                else{
                }
            } catch (error) {
                console.error('上傳失敗', error);
                break;  // 如果任何一個檔案上傳失敗，退出循環
            }
        }
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
                        <div className='flex items-center justify-center w-1/6 h-12 rounded-xl bg-orange-600 hover:bg-orange-800 cursor-pointer mb-4'
                            onClick={upload}>
                            <IoCloudUpload size={"30px"} />
                        </div>
                        {
                            uploadState? <ProgressBars/>:<></>
                        }
                    </>
                )}
            </div>
        </>
    );
}

export default NewCard;
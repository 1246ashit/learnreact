import { useState, useEffect } from 'react';
import ImgCards from './ImgCards';
import VideoCard from './VideoCard';
import { Getfile, GetfilePath } from './GetfileFu';

function ImageLog() {
    const [files, setFiles] = useState([]);  // 初始化為空陣列

    const userid = localStorage.getItem('userid');

    const fetchFiles = async () => {
        try {
            const response = await Getfile(userid);
            if (response && Array.isArray(response)) {
                setFiles(response);  // 一次性設定整個陣列
            } else {
                console.log("Response is not an array or is empty.");
            }
        } catch (error) {
            console.error("Error in fetchFiles: ", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    useEffect(() => {
        const fetchFilePaths = async () => {
            try {
                if (files.length > 0) {  // 確保files不是空的
                    const filePaths = await Promise.all(files.map(file => 
                        GetfilePath(file.media_id, file.image_name, file.media_type)
                    ));
                    console.log("File paths:", filePaths);
                }
            } catch (error) {
                console.error("Error in fetchFilePaths: ", error);
            }
        };
        if (files.length > 0) {
            fetchFilePaths();
        }
    }, [files]);// 增加依賴，使得每次files更新時都重新調用

    return (
        <div className='flex flex-col w-2/4 h-full items-start justify-start px-8' style={{ marginLeft: "30%", marginTop: "5%" }}>
            <ImgCards path={"https://megapx-assets.dcard.tw/images/842ee9d5-6932-47f0-b933-cbb88b388de8/1280.jpeg"} />
            <VideoCard path={"https://api.telegram.org/file/bot6772569179:AAHR6ud9fQyjlTldbWIOyD6uL1pw5RLiv6o/videos/file_43"} />
        </div>
    );
}

export default ImageLog;

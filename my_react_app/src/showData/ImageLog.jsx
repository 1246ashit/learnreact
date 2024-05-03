import { useState, useEffect } from 'react';
import ImgCards from './ImgCards';
import VideoCard from './VideoCard';
import { Getfile, GetfilePath } from './GetfileFu';

function ImageLog() {
    const [files, setFiles] = useState([]);
    const [mediaPaths, setMediaPaths] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);

    const userid = localStorage.getItem('userid');

    const fetchFiles = async () => {
        try {
            const response = await Getfile(userid, pageIndex);
            if (response && Array.isArray(response)) {
                setFiles(prevFiles => {
                    if (JSON.stringify(prevFiles) !== JSON.stringify(response)) {
                        return response;
                    }
                    return prevFiles;
                });
            } else {
                console.log("Response is not an array or is empty.");
            }
        } catch (error) {
            console.error("Error in fetchFiles: ", error);
        }
    };

    const fetchFilePaths = async () => {
        try {
            const paths = await Promise.all(files.map(async file => {
                const info = await GetfilePath(file.media_id, file.image_name, file.media_type,file.m3u8_id,file.m3u8_path,file.thumbnail);
                if (info!=null) {
                    return { type: file.media_type, path: info };
                }
            }));

            setMediaPaths(prevPaths => [...prevPaths, ...paths.filter(path => path !== null)]);
        } catch (error) {
            console.error("Error in fetchFilePaths: ", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [pageIndex]);

    useEffect(() => {
        if (files.length > 0) {
            fetchFilePaths();
        }
    }, [files]);

    useEffect(() => {
        const handleScroll = () => {
            // 計算可滾動的最底部高度。
            const bottomTriggerHeight = document.documentElement.scrollHeight - window.innerHeight;
            // 檢查是否滾動到最底部。
            if (Math.ceil(window.innerHeight + window.scrollY) >= bottomTriggerHeight) {
                setPageIndex(prevPageIndex => prevPageIndex + 1);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    

    return (
        <>
            {mediaPaths.map((media, index) =>
                media.type === '.mp4' ? <VideoCard key={index} path={media.path} />
                                        : <ImgCards key={index} path={media.path} />
            )}
        </>
    );
}

export default ImageLog;

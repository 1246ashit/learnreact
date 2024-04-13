import { useState, useEffect } from 'react';
import ImgCards from './ImgCards';
import VideoCard from './VideoCard';
import { Getfile, GetfilePath } from './GetfileFu';

function ImageLog() {
    const [files, setFiles] = useState([]);
    const [mediaPaths, setMediaPaths] = useState([]);

    const userid = localStorage.getItem('userid');

    const fetchFiles = async () => {
        try {
            const response = await Getfile(userid);
            if (response && Array.isArray(response)) {
                setFiles(response);
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
                const paths = await Promise.all(files.map(async file => {
                    const info = await GetfilePath(file.media_id, file.image_name, file.media_type);
                    if (info.media.length === 1) {
                        return { type: info.media_type, path: info.media[0].chunk_path };
                    } else if (info.media.length >= 2) {
                        return null;
                    }
                }));

                setMediaPaths(paths.filter(path => path !== null));  // Filter out null values
            } catch (error) {
                console.error("Error in fetchFilePaths: ", error);
            }
        };

        if (files.length > 0) {
            fetchFilePaths();
        }
    }, [files]);

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

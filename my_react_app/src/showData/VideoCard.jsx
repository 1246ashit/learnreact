import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import { FaPlay } from "react-icons/fa6";
import ShowVideo from './ShowVideo.jsx';

function VideoCard(props) {
    const [videoSrc, setVideoSrc] = useState([]);
    const [allVideo, setallVideo] = useState(false);

    useEffect(() => {
        // 檢查 props.path.media 是否存在並且包含項目
        if (props.path && props.path.media && props.path.media.length > 0) {
            // 從每個 media 物件中提取 chunkpath，並更新 videoSrc 狀態
            const mediaUrls = props.path.media.map(mediaItem => mediaItem.chunk_path);
            setVideoSrc(mediaUrls);
        }
    }, [props.path]);



    return (
        <>
            <div className='flex flex-col w-4/5 h-auto items-center justify-center rounded-xl bg-purple-700 mt-4 cursor-pointer relative'
                onClick={() => setallVideo(true)}>
                {videoSrc.length > 0 && (
                    <ReactPlayer
                        width='90%'
                        url={videoSrc[0]}
                        style={{ position: 'relative', zIndex: 1 }} // 確保 ReactPlayer 在背景
                    />
                )}
                <FaPlay  size={'50px'} style={{color: 'orange', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }} />
            </div>
            {allVideo ? <ShowVideo videoSrc={videoSrc} setallVideo={setallVideo} /> : <></>}
        </>
    );
}

export default VideoCard;
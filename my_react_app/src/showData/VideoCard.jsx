import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import { FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";

function VideoCard(props) {
    const [videoSrc, setVideoSrc] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        if (props.path && props.path.media && props.path.media.length > 0) {
            setVideoSrc(props.path.media);
            setIsVideoLoaded(false);  // 初始化時即設定影片為可載入狀態
        }
    }, [props.path]);

    const handleVideoEnd = () => {
        const nextVideoIndex = (currentVideoIndex + 1) % videoSrc.length;
        setCurrentVideoIndex(nextVideoIndex);
        setIsVideoLoaded(true);
    };

    const videoBackward = () => {
        let nextVideoIndex = (currentVideoIndex - 1 + videoSrc.length) % videoSrc.length; // 修正後退索引計算
        console.log("nextVideoIndex:" + nextVideoIndex);
        setCurrentVideoIndex(nextVideoIndex);
        setIsVideoLoaded(true);
    }


    return (
        <div className='flex flex-col w-4/5 h-auto items-center justify-center rounded-xl bg-purple-700 mt-4'>
            {videoSrc.length > 0 && (
                <ReactPlayer
                    width='90%'
                    url={videoSrc[currentVideoIndex].chunk_path} // 修改為 url
                    controls
                    onEnded={handleVideoEnd}
                    playing={isVideoLoaded} // 控制播放狀態
                />
            )}
            <div className='flex flex-row'>
                <div className='hover: bg-purple-900 cursor-pointer rounded-xl px-3 py-2 m-3'
                    onClick={videoBackward}>
                    <FaStepBackward size={"30px"} />
                </div>
                <div className='hover: bg-purple-900 cursor-pointer rounded-xl px-3 py-2 m-3'
                    onClick={handleVideoEnd} >
                    <FaStepForward size={"30px"} />
                </div>
            </div>
        </div>
    );
}

export default VideoCard;

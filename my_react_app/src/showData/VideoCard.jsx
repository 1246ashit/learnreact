import { useState } from 'react';
import { FaHome } from "react-icons/fa";
function VideoCard(props) {
    const [videoSrc, setVideoSrc] = useState('');

    const handleVideoLoad = () => {
        // 設置視頻來源，開始加載
        setVideoSrc(props.path);
    };

    return (
        <>
            <div className='flex w-4/5 h-auto items-center justify-center rounded-xl bg-purple-700 mt-4'>
            <video 
                className='w-10/12 h-auto rounded-xl p-1' 
                src={videoSrc} 
                controls
                onClick={handleVideoLoad} // 點擊視頻時設置來源並加載
            >
                {videoSrc === '' && <button onClick={handleVideoLoad}>播放視頻</button>}
            </video>
        </div>
        </>
    );
}
export default VideoCard;
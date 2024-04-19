import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player'
import { FaPlay } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import ShowVideo from './ShowVideo.jsx';
import FunctionList from './FunctionList.jsx';


function VideoCard(props) {
    const [showFUList, setShowFUList] = useState(false);
    const [functionListPosition, setFunctionListPosition] = useState({ top: '20px', left: '20px' });
    const gearIconRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState({ m3u8Path: '', m3u8Id: '', preview: '' });
    const [allVideo, setallVideo] = useState(false);

    useEffect(() => {
        // 檢查 props.path.media 是否存在並且包含項目
        if (props.path && props.path.m3u8_path && props.path.m3u8_id) {
            // 從每個 media 物件中提取 chunkpath，並更新 videoSrc 狀態
            setVideoSrc({
                m3u8Path: props.path.m3u8_path,
                m3u8Id: props.path.m3u8_id,
                preview: props.path.media[0].chunk_path_in_tg
            });
        }
    }, [props.path]);

    const updateFunctionListPosition = () => {
        const gearPosition = gearIconRef.current.getBoundingClientRect();
        setFunctionListPosition({
            top: `${gearPosition.bottom - 120}px`,
            left: `${gearPosition.left}px`
        });
    };

    const handleGearClick = () => {
        updateFunctionListPosition(); // 確保點擊時更新位置
        setShowFUList(!showFUList);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (showFUList) {
                updateFunctionListPosition();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showFUList]);  // 添加 showFUList 為依賴，保證只有在顯示時才監聽滾動

    return (
        <>
            <div className='flex flex-col w-4/5 h-auto items-center justify-center rounded-xl bg-purple-700 mt-4 cursor-pointer relative'>
                <div className='flex items-center justify-center' onClick={() => setallVideo(true)}>
                    {props.path.media.length > 0 && (
                        <img
                            className='w-10/12 h-auto rounded-xl p-1'
                            src='https://imarketing.iwant-in.net/wp-content/uploads/2021/04/2021_04_08_P1_123RF.jpg'
                            style={{ position: 'relative', zIndex: 1 }} // 確保 ReactPlayer 在背景
                        />
                    )}
                    <FaPlay size={'50px'} style={{ color: 'orange', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }} />
                </div>
                <div className="absolute bottom-5 right-1 cursor-pointer mt-5"
                    onClick={handleGearClick} ref={gearIconRef}>
                    <FaGear size={'30px'} />
                </div>
            </div>
            {allVideo ? <ShowVideo videoSrc={videoSrc} setallVideo={setallVideo} /> : <></>}
            {showFUList ?
                <FunctionList image_name={props.path.image_name} top={functionListPosition.top} left={functionListPosition.left} /> : null
            }
        </>
    );
}

export default VideoCard;
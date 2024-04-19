import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { GiCancel } from "react-icons/gi";
import { GetStreamVideo } from './GetfileFu';
import ReactLoading from 'react-loading';

function ShowVideo(prop) {
    const videoRef = useRef(null);
    const [url, setUrl] = useState(null);
    const userid = localStorage.getItem('userid');
    const baseUrl = "http://localhost:5259/api/Stream/";

    const fetchVideo = async () => {
        const response = await GetStreamVideo(userid, prop.videoSrc.m3u8Path, prop.videoSrc.m3u8Id);
        if (response != null) {
            // 假設 response 是 m3u8 文件的 URL
            const m3u8Response = await fetch(response);
            let m3u8Content = await m3u8Response.text();
            // 使用正則表達式修正 TS 檔案的 URL
            const correctedM3U8 = m3u8Content.replace(/(.+\.ts)/g, baseUrl + '$1');
            // 創建 blob 並生成新的 URL
            const blob = new Blob([correctedM3U8], { type: 'application/x-mpegURL' });
            const correctedUrl = URL.createObjectURL(blob);
            console.log("correctedM3U8",correctedM3U8)
            setUrl(correctedUrl);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, [prop.videoSrc]);

    useEffect(() => {
        const video = videoRef.current;
        if (video && url) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play();
                });

                return () => hls.destroy();
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
                video.addEventListener('loadedmetadata', () => {
                    video.play();
                });
            }
        }
    }, [url]);

    return (
        <div className='fixed top-24 left-1/4 flex flex-col items-center justify-center bg-purple-900 rounded-xl shadow w-1/2 h-2/3'
            style={{ zIndex: 1000 }}>
            <div className='absolute top-0 right-0 cursor-pointer'
                onClick={() => prop.setallVideo(false)}>
                <GiCancel size={'30px'} /></div>
            {url ? (
                <video ref={videoRef} controls width="90%" height="90%">
                    Your browser does not support the video tag.
                </video>
            ) : (
                <ReactLoading height={'20%'} width={'20%'} />
            )}
        </div>
    );
}

export default ShowVideo;

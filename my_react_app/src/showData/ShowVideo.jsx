import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import { GiCancel } from "react-icons/gi";
import { GetStreamVideo } from './GetfileFu';
import ReactLoading from 'react-loading';

function ShowVideo(prop) {
    const [url, setUrl] = useState(null);
    const userid = localStorage.getItem('userid')

    const fetchVideo = async () => {
        const response = await GetStreamVideo(userid, prop.videoSrc);
        if (response != null) {
            console.log("url:" + response);
            setUrl(response);
        }
    };
    useEffect(() => {
        fetchVideo();
    }, [prop.videoSrc, userid]);

    return (
        <div className='fixed top-24 left-1/4 flex flex-col items-center justify-center bg-purple-900 rounded-xl shadow w-1/2 h-2/3'
            style={{ zIndex: 1000 }}>
            <div className='absolute top-0 right-0 cursor-pointer'
                onClick={() => prop.setallVideo(false)}>
                <GiCancel size={'30px'} /></div>
            {url != null ?
                <ReactPlayer
                    width='90%'
                    url={url}
                    controls /> : <ReactLoading  height={'20%'} width={'20%'} />
            }
        </div >
    );
}

export default ShowVideo;

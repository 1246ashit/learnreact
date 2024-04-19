import React, { useEffect, useState } from 'react';
import { DeleteFile } from './GetfileFu'; // 確保這裡的路徑是正確的

function FunctionList(props) {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setUserId(localStorage.getItem("userid"));
    }, []);

    const positionStyle = {
        top: props.top,
        left: props.left,
        position: 'fixed',
        zIndex: 1000
    };

    const deleteFile = async () => {
        if (!userId || !props.image_name) {
            console.error('Missing user ID or image name.');
            return;
        }
        const response = await DeleteFile(userId, props.image_name);
        console.log("deleteFile:", response);
        //delete success
        if(response=="delete success"){
            window.location.reload();
        }
    };

    return (
        <div className='flex flex-col items-center bg-pink-500 w-32 h-auto rounded-xl' style={positionStyle}>
            <div className='w-8/12 h-auto hover:bg-pink-700 p-2 m-1 cursor-pointer rounded-xl'
            onClick={deleteFile}>
                刪除
            </div>
        </div>
    );
}

export default FunctionList;

import React, { useState } from 'react';
import ReactLoading from 'react-loading';

function ProgressBars() {
    const [progress, setProgress] = useState(50); // 初始進度設置為50%

    const handleProgressChange = (event) => {
        setProgress(event.target.value);
    };

    return (
        <div className='fixed top-1/4 left-1/2 transform -translate-x-1/4 -translate-y-1/2 flex flex-col items-center justify-center bg-pink-700 rounded-xl w-1/6 h-1/6'>
            <h1 className='font-bold'>別離開,上傳中...</h1>
            <ReactLoading  height={'20%'} width={'20%'} />
        </div>
    );
}

export default ProgressBars;

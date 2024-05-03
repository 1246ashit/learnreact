import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import ProgressBar from "@ramonak/react-progress-bar";

function ProgressBars() {
    const maxCount = 98;
    const [count, setCount] = useState(0); // 使用 useState 管理 count
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(currentCount => {
                if (currentCount < maxCount) {
                    console.log(currentCount);
                    return currentCount + 1;
                } else {
                    clearInterval(intervalId); // 如果數字達到 98，停止計時器
                    console.log('Done counting to ' + maxCount);
                    return currentCount;
                }
            });
        }, 1000);
        
        return () => clearInterval(intervalId);
    }, []); 

    return (
        <div className='fixed top-3/4 left-3/4 transform -translate-x-1/4 -translate-y-1/2 flex flex-col items-center justify-center bg-pink-700 rounded-xl w-1/6 h-1/6'>
            <h1 className='font-bold'>別離開,上傳中...</h1>
            <div className='w-4/5'>
                <ProgressBar completed={count} maxCompleted={100} />
            </div>
        </div>
    );
}

export default ProgressBars;

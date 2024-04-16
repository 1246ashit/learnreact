import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import ProgressBar from "@ramonak/react-progress-bar";

function ProgressBars(props) {
    

    return (
        <div className='fixed top-1/4 left-1/2 transform -translate-x-1/4 -translate-y-1/2 flex flex-col items-center justify-center bg-pink-700 rounded-xl w-1/6 h-1/6'>
            <h1 className='font-bold'>別離開,上傳中...</h1>
            <div className='w-4/5'>
                <ProgressBar completed={props.completed} maxCompleted={props.maxCompleted} />
            </div>
        </div>
    );
}

export default ProgressBars;

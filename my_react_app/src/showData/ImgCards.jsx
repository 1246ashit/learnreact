import React, { useState, useRef, useEffect } from 'react';
import { FaGear } from "react-icons/fa6";
import FunctionList from "./FunctionList";


function ImgCards(props) {
    const [showFUList, setShowFUList] = useState(false);
    const [functionListPosition, setFunctionListPosition] = useState({ top: '20px', left: '20px' });
    const gearIconRef = useRef(null);

    const updateFunctionListPosition = () => {
        const gearPosition = gearIconRef.current.getBoundingClientRect();
        setFunctionListPosition({
            top: `${gearPosition.bottom-120}px`,
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
            <div className='relative flex w-4/5 h-auto items-center justify-center rounded-xl bg-purple-700 mt-4'>
                <img className='w-10/12 h-auto rounded-xl p-1'
                    src={props.path.media[0].chunk_path} />
                <div className="absolute bottom-5 right-1 cursor-pointer"
                    onClick={handleGearClick} ref={gearIconRef}>
                    <FaGear size={'30px'} />
                </div>
            </div>
            {showFUList ?
                <FunctionList  image_name={props.path.media[0].image_name} top={functionListPosition.top} left={functionListPosition.left} /> : null
            }
        </>
    );
}

export default ImgCards;

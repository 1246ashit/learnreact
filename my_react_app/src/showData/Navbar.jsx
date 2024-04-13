import { useState } from 'react';
import { FaHome } from "react-icons/fa";
function Navbar() {

    return (
        <>
            <div className='fixed top-0 left-0 flex w-1/4 h-full items-start justify-end bg-red-400'>
                <div className='flex flex-row px-9 py-12'>
                    <div className='flex flex-row font-bold text-2xl px-4 py-2 hover:bg-red-600 rounded-lg cursor-pointer'>
                        <FaHome size={"35px"} />首頁
                    </div>
                </div>
            </div>
        </>
    );
}
export default Navbar;
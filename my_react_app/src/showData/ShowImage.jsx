import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import Navbar from './Navbar';
import ImageLog from './ImageLog';
function ShowImage() {

    return (
        <div className='flex h-screen bg-black'>
            <Navbar/>
            <ImageLog/>
        </div>
    );
}
export default ShowImage;
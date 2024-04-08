import React, { useState, useEffect } from 'react';
import { GetImgPath, } from '../MyAPI/ImgService';
import Card from '../CardPage/Card';
import NewCard from '../CardPage/NewCard';

function ShowImg() {
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        const fetchImgPaths = async () => {
            try {
                const userId = localStorage.getItem('id');
                const result = await GetImgPath(userId);
                setImgs(result);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchImgPaths();
    }, [imgs]);



    if (imgs.length === 0) {
        return (
            <div style={{ width: '480px', height:"384px"}}>
                <NewCard />
            </div>);
    } else {
        return (
            <div>
                <NewCard />
                <Card imgs={imgs} />
            </div>

        );
    }
}

export default ShowImg;

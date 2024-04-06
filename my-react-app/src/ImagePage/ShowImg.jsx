import React, { useState, useEffect } from 'react';
import { GetImgPath, GetImg } from '../MyAPI/ImgService';
import Card from '../CardPage/Card';
import NewCard from '../CardPage/NewCard';

function ShowImg() {
    const [imgPaths, setImgPaths] = useState([]);
    const [imgs, setImgs] = useState([]); // 用於儲存所有圖片的 URL

    useEffect(() => {
        const fetchImgPaths = async () => {
            try {
                const id = localStorage.getItem('id');
                const result = await GetImgPath(id);
                setImgPaths(result);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchImgPaths();
    }, []);

    useEffect(() => {
        const fetchImgs = async () => {
            if (imgPaths.length > 0) {
                const imgsData = await Promise.all(imgPaths.map(async (path) => {
                    try {
                        // 假設GetImg返回一個物件{ imgURL, imageSha }
                        const { imgURL, imageSha } = await GetImg(encodeURIComponent(path.image_path));
                        const imagePath=path.image_path;
                        return { imgURL, imageSha,imagePath }; // 直接返回這個物件
                    } catch (error) {
                        console.error('Failed to fetch image:', error);
                        return null; // 在錯誤情況下返回 null
                    }
                }));
                setImgs(imgsData.filter(data => data !== null)); // 過濾掉任何因錯誤而未能加載的項目
            }
        };
        fetchImgs();
    }, [imgPaths]); // 當 imgPaths 變化時觸發

    if (imgs.length === 0) return <div>Loading...</div>;

    return (
        <div>
            <NewCard />
            <Card imgs={imgs} />
        </div>

    );

}

export default ShowImg;

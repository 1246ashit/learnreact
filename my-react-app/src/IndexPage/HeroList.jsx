import React, { useState, useEffect } from 'react';
import { fetchResource } from '../MyAPI/apiService';
import Card from '../CardPage/Card';

function Herolist() {
    const [heroes, setData] = useState(null);
    const [profiles, setProfile] = useState(["batman.webp", "ironman.jpg"]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await fetchResource();
            setData(result);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        fetchData();
    }, []);
    
    if (!heroes) return <div>Loading...</div>;
    return (
        <div className="flex min-h-screen"> {/* 使用 flex 來使子組件並列 */}
            <Card heroes={heroes} profiles={profiles} />
        </div>
    );
}
export default Herolist;

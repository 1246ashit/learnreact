import React, { useState } from 'react';
import Navbar from '../IndexPage/Navbar';

function AddHero() {
  // 初始化表單狀態
  const [formData, setFormData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    power: "",
    place: ""
  });

  // 處理表單輸入欄位變更
  const handleChange = (e) => {
    const { name, value } = e.target; // 正確從 event 的 target 中獲取 name 和 value
    setFormData({
      ...formData,
      [name]: value, // 使用變量 name 作為鍵來更新對應的值
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止表單默認提交
  
    try {
      const response = await fetch('http://localhost:5259/api/Home/CeateNewHero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text(); // 先獲取文本響應
      let data = null;
  
      try {
        data = text ? JSON.parse(text) : {}; // 嘗試解析文本為 JSON
      } catch (error) {
        console.error('解析 JSON 失敗:', error);
      }
  
      if (response.ok) {
        console.log('提交成功:', data);
        // 處理成功提交，例如重置表單或更新 UI
      } else {
        // 如果響應不是 ok，處理錯誤情況
        console.error('提交失敗:', data);
      }
    } catch (error) {
      console.error('提交過程中發生錯誤:', error);
    }
  };

  return (
  <div className="flex min-h-screen "> {/* 使用 flex 來使子組件並列 */}
    <Navbar />
    <form onSubmit={handleSubmit} className="  p-4 w-2/4" style={{ marginLeft: '25%' }}>
      <div>
        <label htmlFor="firstName">firstName:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">lastName:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="power">超能力:</label>
        <input
          type="text"
          id="power"
          name="power"
          value={formData.power}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="place">活動地點:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={formData.place}
          onChange={handleChange}
        />
      </div>
      <button type="submit">提交</button>
    </form>
  </div>
  );
}

export default AddHero;

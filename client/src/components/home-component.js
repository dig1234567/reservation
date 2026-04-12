import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const HomeComponent = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!currentUser) {
      alert("請先登入");
      navigate("/login");
      return;
    }
    navigate("/online");
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">海底撈火鍋</h1>
        <p className="hero-subtitle">線上訂位更快速、便利、無需等待</p>
      </div>

      <div className="info-card">
        <h2>餐廳資訊</h2>
        <p>
          <strong>📍 地址：</strong> 台中市西屯區台灣大道三段251號12樓南棟
        </p>
        <p>
          <strong>🕒 營業時間：</strong> 11:00 – 04:00
        </p>
        <p>
          <strong>☎ 電話：</strong> 04-2254-0250
        </p>
        <p>
          <strong>✨ 服務：</strong>{" "}
          美甲、按摩椅、兒童遊戲區、冰淇淋、飲料等免費享用
        </p>
      </div>

      <div className="btn-area">
        <button onClick={handleOrder} className="btn-order">
          立即訂位
        </button>
      </div>
    </div>
  );
};

export default HomeComponent;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authServices from "../services/auth-services";
import reservationServices from "../services/reservation-services";
import "../App.css";

const OnlineComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState("");

  const handlemember = () => {
    navigate("/member");
  };

  const handlelogout = () => {
    authServices.logout();
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.alert("登出成功");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await reservationServices.newOrder(date, time, partySize);
      alert("訂位成功");
      navigate("/member");
      console.log(res.data);
    } catch (e) {
      if (e.response && e.response.data) {
        alert(e.response.data);
      } else {
        alert("訂位失敗,請稍後再試");
      }
    }
  };

  return (
    <div>
      <header className="header">
        <h1 style={{ color: "white" }} className="h1">
          海底撈訂位系統
        </h1>
        {currentUser && (
          <>
            <button onClick={handlemember} className="nav_btn">
              會員中心
            </button>
            <button onClick={handlelogout} className="nav_btn">
              登出
            </button>
          </>
        )}
      </header>

      {/* ⭐ 訂位主卡片 */}
      <main className="order-container">
        <h2 className="order-title">線上訂位</h2>

        <form onSubmit={handleSubmit} className="order-card">
          <label>選擇日期</label>
          <input
            type="date"
            className="input-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>選擇時間</label>
          <select
            className="input-field"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">請選擇時間</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
          </select>

          <label>選擇人數</label>
          <select
            className="input-field"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
          >
            <option value="">請選擇人數</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-btn">
            送出訂位
          </button>
        </form>

        <p className="note">
          人數如超過 10 位以上，請使用電話預約，謝謝配合 🙏
        </p>
      </main>
    </div>
  );
};

export default OnlineComponent;

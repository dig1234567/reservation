import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/auth-services";
import reservationServices from "../services/reservation-services";
import "../App.css";

const MemberComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // 一進頁面就抓訂位紀錄
    reservationServices
      .my()
      .then((res) => setRecords(res.data))
      .catch((err) => console.log("抓訂位紀錄錯誤：", err));
  }, []);

  const handleLogout = () => {
    authServices.logout();
    localStorage.removeItem("user");
    setCurrentUser(null);
    alert("登出成功！");
    navigate("/");
  };

  const handleHomepage = () => {
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("確定要刪除這筆訂位？")) return;
    try {
      await reservationServices.delete(id);
      setRecords(records.filter((r) => r._id !== id));
      alert("刪除成功！");
    } catch (err) {
      console.log(err);
      alert("刪除失敗！");
    }
  };

  const handleEdit = (order) => {
    const newDate = window.prompt("新的日期 (YYYY-MM-DD)", order.date);
    const newTime = window.prompt("新的時間 (HH:mm)", order.time);
    const newPartySize = window.prompt("新的人數", order.partySize);

    reservationServices
      .update(order._id, {
        date: newDate,
        time: newTime,
        partySize: newPartySize,
      })
      .then((res) => {
        setRecords((prev) =>
          prev.map((x) => (x._id === order._id ? res.data.updated : x)),
        );
        alert("修改成功！");
      })
      .catch((err) => {
        console.log(err);
        alert("修改失敗！");
      });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header className="header">
        <h1 style={{ color: "white" }} className="h1">
          海底撈訂位系統
        </h1>
        {currentUser && (
          <div>
            <button onClick={handleHomepage} className="nav_btn">
              首頁
            </button>
            <button onClick={handleLogout} className="nav_btn">
              登出
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* 會員資料 */}
        <div
          style={{
            flex: "1 1 250px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            minWidth: "250px",
            backgroundColor: "#fafafa",
          }}
        >
          <h2>會員資料</h2>
         <p>
  <strong>姓名：</strong> {currentUser?.username}
</p>
<p>
  <strong>Email：</strong> {currentUser?.email}
</p>
        </div>

        {/* 訂位紀錄 */}
        <div style={{ flex: "2 1 500px" }}>
          <h2 style={{ color: "white" }}>我的訂位紀錄</h2>
          {records.length === 0 && (
            <p style={{ color: "#fff" }}>目前沒有任何訂位紀錄</p>
          )}

          {records.map((r) => (
            <div
              key={r._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "1rem",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <div>
                <p>
                  <strong>日期：</strong>
                  {r.date}
                </p>
                <p>
                  <strong>時間：</strong>
                  {r.time}
                </p>
                <p>
                  <strong>人數：</strong>
                  {r.partySize}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(r)}
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  修改
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  刪除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberComponent;

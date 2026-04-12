import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authServices from "../services/auth-services";
import "../App.css";

const Nav = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handlemember = () => {
    navigate("/member");
  };
  const handlelogout = () => {
    authServices.logout(); // 如果你有登出邏輯，這裡可加上清除 localStorage
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.alert("登出成功！");
    navigate("/");
  };

  return (
    <div>
      <header className="header">
        <h1 style={{ color: "white" }} className="h1">
          海底撈訂位系統
        </h1>
        {!currentUser && (
          <>
            <button onClick={handleLogin} className="nav_btn">
              登入
            </button>
            <button onClick={handleRegister} className="nav_btn">
              註冊
            </button>
          </>
        )}

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
    </div>
  );
};

export default Nav;

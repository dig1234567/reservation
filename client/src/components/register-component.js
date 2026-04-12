import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/auth-services";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleButton = async () => {
    authServices
      .register(username, email, password)
      .then(() => {
        alert("註冊成功！即將導向登入頁面");
        navigate("/login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>註冊會員</h2>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            用戶名稱
          </label>
          <input
            onChange={handleUsername}
            type="text"
            placeholder="英文名字或中文名字"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            電子信箱
          </label>
          <input
            onChange={handleEmail}
            type="email"
            placeholder="email or gmail"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            密碼
          </label>
          <input
            onChange={handlePassword}
            type="password"
            placeholder="長度至少超過6個英文或數字"
            style={styles.input}
          />
        </div>
        <button onClick={handleButton} style={styles.button}>
          註冊會員
        </button>
        <p style={styles.loginText}>
          已有帳號？{" "}
          <span onClick={() => navigate("/login")} style={styles.loginLink}>
            立即登入
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: "400px",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#8a8000",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    transition: "0.3s",
  },
  loginText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#666",
  },
  loginLink: {
    color: "#8a8000",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default RegisterComponent;

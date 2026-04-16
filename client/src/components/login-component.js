import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/auth-services";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authServices.login(email, password);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.token);
      setCurrentUser(user);
      window.alert("登入成功，您即將被導向到會員中心");
      navigate("/member");
    } catch (error) {
      console.log(error);
      setMessage("登入失敗, 請確認帳號或密碼..");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>登入會員</h2>
        {message && <div style={styles.alert}>{message}</div>}
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>電子郵件</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>密碼</label>
            <input
              type="password"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            登入
          </button>
        </form>
        <p style={styles.registerText}>
          還沒有帳號？{" "}
          <span
            onClick={() => navigate("/register")}
            style={styles.registerLink}
          >
            立即註冊
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
  form: {
    display: "flex",
    flexDirection: "column",
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
  alert: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#666",
  },
  registerLink: {
    color: "#8a8000",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default LoginComponent;

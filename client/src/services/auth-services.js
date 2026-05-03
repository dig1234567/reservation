import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/user`;

class AuthService {
  // 註冊
  register(username, email, password) {
    return axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
  }

  // 登入
  async login(email, password) {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    // 登入成功後存 localStorage
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
  }

  // 登出
  logout() {
    localStorage.removeItem("user");
  }

  // 取得目前使用者資料
  getCurrentUser() {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") return null;

    try {
      return JSON.parse(user);
    } catch (error) {
      return null;
    }
  }

  // 取得 token
  getToken() {
    const user = this.getCurrentUser();
    return user?.token || null;
  }

  // 是否登入中
  isLoggedIn() {
    return !!this.getToken();
  }
}

export default new AuthService();

import axios from "axios";

const API_URL = "https://reservation-1-tnsv.onrender.com/api/user";

class AuthService {
  register(username, email, password) {
    return axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
  }

  async login(email, password) {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

   

    return res.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.token || null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

export default new AuthService();

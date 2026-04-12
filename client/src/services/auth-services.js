import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      email,
      username,
      password,
    });
  }
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();

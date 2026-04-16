import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/reservations`;

// 訂位邏輯處理
class Reservation {
  newOrder(date, time, partySize) {
    const token = localStorage.getItem("token");

    return axios.post(
      API_URL,
      {
        date,
        time,
        partySize: Number(partySize),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  my() {
    const token = localStorage.getItem("token");

    return axios.get(`${API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ❗ 這裡你原本有 bug（多打一層 reservation）
  delete(id) {
    const token = localStorage.getItem("token");

    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ❗ 同樣這裡也有 bug
  update(id, data) {
    const token = localStorage.getItem("token");

    return axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Reservation();

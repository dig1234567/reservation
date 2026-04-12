import axios from "axios";
const API_URL = "http://localhost:8080/api/reservation";

// 訂位邏輯處理
class Reservation {
  newOrder(date, time, partySize) {
    const token = localStorage.getItem("token");
    console.log("目前的token", token);
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
    console.log("目前的token", token);
    return axios.get(API_URL + "/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // 刪除訂位
  delete(id) {
    const token = localStorage.getItem("token");
    console.log("目前的token", token);
    return axios.delete(API_URL + `/reservation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 修改訂位
  update(id, data) {
    const token = localStorage.getItem("token");
    console.log("目前的token", token);
    return axios.put(API_URL + `/reservation/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Reservation();

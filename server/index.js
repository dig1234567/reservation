require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./router/auth");
const reservations = require("./router/reservation");

const app = express();

// middleware
app.use(cors()); // 允許所有來源
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", auth);
app.use("/api/reservation", reservations);

app.get("/", (req, res) => {
  res.send("歡迎來到餐廳訂位系統");
});

const PORT = process.env.PORT || 8080;

// ❗先連線DB，再啟動 server 預防資料庫還沒連到就聆聽請求發生Race Condition
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ 資料庫連接成功");

    app.listen(PORT, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log("❌ DB 連線失敗:", err);
  });


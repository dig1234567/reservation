const router = require("express").Router();
const { Table, Reservation } = require("../models");
const auth = require("../middleware/auth"); // 你的 JWT middleware

// 查詢我的訂位
router.get("/my", auth, async (req, res) => {
  try {
    // 從 token 拿 user id（這要靠你寫的 auth middleware）
    const userId = req.user._id;

    const reservation = await Reservation.find({ user: userId })
      .populate("table")
      .populate("user", "name email")
      .sort({ date: 1, time: 1 });

    console.log("使用者已成功取得訂位資訊");
    return res.json(reservation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//查詢某一天訂位
router.get("/", async (req, res) => {
  try {
    //取得前端傳來的日期
    const { date } = req.query;
    // 檢查有無傳送date 避免亂抠API
    if (!date) {
      res.status(400).json({ message: "請提供日期" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const reservation = await Reservation.find({
      date: { $gte: start, $lte: end },
      status: "booked",
    });
    res.send({
      message: "以下是你的訂位紀錄",
      reservation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 查詢某天還有沒有位置
router.get("/availability", async (req, res) => {
  try {
    const { date, time } = req.query;

    const bookedCount = await Reservation.countDocuments({
      date,
      time,
      status: "booked",
    });
    const totalTables = await Table.countDocuments();
    res.json({
      totalTables,
      bookedCount,
      availableTable: totalTables - bookedCount,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// 刪除訂位（需登入）
router.delete("/reservation/:id", auth, async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = req.user._id;

    const reservation = await Reservation.findOne({
      _id: reservationId,
      user: userId,
    });

    if (!reservation) {
      return res.status(404).json({ message: "找不到訂位或沒有權限刪除" });
    }

    await Reservation.deleteOne({ _id: reservationId });
    res.json({ message: "訂位已成功刪除" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 修改訂位（需登入）
router.put("/reservation/:id", auth, async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = req.user._id;

    const { date, time, partySize } = req.body;
    console.log("使用者正在更改訂單", userId);

    const reservation = await Reservation.findOne({
      _id: reservationId,
      user: userId,
    });

    if (!reservation) {
      return res.status(404).json({ message: "找不到訂位或沒有權限修改" });
    }

    reservation.date = date || reservation.date;
    reservation.time = time || reservation.time;
    reservation.partySize = partySize || reservation.partySize;

    await reservation.save();

    res.json({
      message: "訂位已更新",
      updated: reservation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 新增訂位
router.post("/", auth, async (req, res) => {
  try {
    let { time, date, partySize } = req.body;
    const userId = req.user._id; // ✅ 一定要先拿登入者

    // 先檢查這個人有沒有 already 訂過
    const existing = await Reservation.findOne({
      user: userId,
      date,
      time,
      status: "booked",
    });

    if (existing) {
      return res.status(400).json({ message: "你已經訂過這個時段" });
    }

    partySize = Number(partySize);

    if (!partySize || partySize <= 0) {
      return res.status(400).send("請輸入正確人數");
    }

    const tables = await Table.find({ capacity: { $gte: partySize } }).sort(
      "capacity",
    );

    if (tables.length === 0) {
      return res.status(400).send("沒有符合人數的桌位");
    }

    const reserved = await Reservation.find({ date, time, status: "booked" });

    const reservedTableIds = reserved.map((r) => r.table.toString());

    const availableTable = tables.find(
      (t) => !reservedTableIds.includes(t._id.toString()),
    );

    if (!availableTable) {
      return res.status(409).send("該時段已客滿");
    }

    const newReservation = new Reservation({
      user: userId,
      table: availableTable._id,
      date,
      time,
      partySize,
    });

    await newReservation.save();

    res.send({
      message: "訂位成功",
      tableNumber: availableTable.tableNumber,
      reservation: newReservation,
    });
  } catch (err) {
    console.log("❌ 訂位錯誤:", err);
    res.status(500).send("訂位失敗");
  }
});

module.exports = router;

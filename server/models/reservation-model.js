const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const reservationSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },

  date: Date,
  time: String,
  partySize: Number,
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked",
  },
});

// 資料庫防範機制 預防同一天同時兩個人送出請求
reservationSchema.index({ table: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Reservation", reservationSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// 桌位管理
const tableSchema = new Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true, // 不要出現兩個五號桌
  },
  capacity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Table", tableSchema);

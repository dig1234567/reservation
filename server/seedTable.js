require("dotenv").config();
const mongoose = require("mongoose");
const Table = require("./models/table-model");
console.log("【SEED 使用的 DB】", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

const seedTables = async () => {
  try {
    await Table.deleteMany(); // 清空舊資料（避免重複）

    await Table.insertMany([
      { tableNumber: 1, capacity: 2 },
      { tableNumber: 2, capacity: 2 },
      { tableNumber: 3, capacity: 4 },
      { tableNumber: 4, capacity: 4 },
      { tableNumber: 5, capacity: 6 },
      { tableNumber: 6, capacity: 8 },
    ]);

    console.log("✅ 桌位建立完成");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

seedTables();

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

//創建用戶規範
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.comparePassword = async function (password, cb) {
  let result = await bcrypt.compare(password, this.password);
  return cb(null, result);
};

// mongoose middleware
// 若使用者為新用戶或正在更改密碼 , 則進行雜湊處理
userSchema.pre("save", async function () {
  // this 代表 mongodb document
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("User", userSchema);

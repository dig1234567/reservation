const router = require("express").Router();
const user = require("../models/user-model");
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在經過middle");
  next();
});

router.get("/", (req, res) => {
  res.send("歡迎來到使用者介面");
});

router.post("/register", async (req, res) => {
  // 檢查輸入規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱有無存在
  const checkEmail = await user.findOne({ email: req.body.email });
  if (checkEmail) {
    res.send("此信箱已存在請重新註冊");
    return;
  }

  let { username, email, password } = req.body;
  let newUser = new user({ username, email, password });
  console.log("用戶資訊", newUser);

  // 儲存到mongoDB
  try {
    let saveUser = await newUser.save();
    return res.send({
      message: "已儲存到資料庫",
      saveUser,
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  // 檢查輸入規範
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認有無使用者
  const checkUser = await user.findOne({ email: req.body.email });
  if (!checkUser) {
    return res.status(401).send("使用者不存在請先註冊帳戶");
  }

  // 比較密碼
  checkUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);
    // 製作Json Web token
    if (isMatch) {
      const tokenObject = {
        _id: checkUser._id,
        email: checkUser.email,
      };
      const token = jwt.sign(tokenObject, process.env.JWT_SECRET);
      return res.send({
        msg: "成功登入",
        token: token,
        user: checkUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

module.exports = router;

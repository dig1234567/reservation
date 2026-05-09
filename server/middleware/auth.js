const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "沒有權限，請先登入" });
  }

  try {
    // ✔ 更穩定的 token 拆法
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token 格式錯誤" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✔ 統一 user 結構（重點修正）
    req.user = {
      _id: decoded.id || decoded._id,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (err) {
    console.log("JWT Error:", err.message);
    return res.status(401).json({ message: "Token 無效或過期" });
  }
};

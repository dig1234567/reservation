const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  console.log("Authorization Header:", authHeader); // 👈 加這行

  if (!authHeader) {
    return res.status(401).json({ message: "沒有權限，請先登入" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token 無效" });
  }
};

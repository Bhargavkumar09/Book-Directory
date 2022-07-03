const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  token = token.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(400).json({ message: "Invalid token" });
  }
};

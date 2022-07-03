module.exports = function (req, res, next) {
  if (!req.user.isAdmin === true)
    return res.status(400).json({ message: "Access Denied" });
  next();
};

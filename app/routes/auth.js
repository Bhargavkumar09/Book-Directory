const router = require("express").Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/User");

router.post("/signup", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) throw new Error(error.details[0].message);

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail)
    return res.status(400).json({ message: "email already registered!" });

  const user = new User(_.pick(req.body, ["name", "email", "password"]));

  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  return res.status(200).json({ message: "regitered successfully" });
});

router.post("/signin", async (req, res) => {
  const validUser = await User.findOne({ email: req.body.email });
  if (!validUser)
    return res.status(400).json({ message: "email or password is incorrect" });

  const password = await bcrypt.compare(req.body.password, validUser.password);
  if (!password)
    return res.status(400).json({ message: "email or password is incorrect" });

  const token = validUser.generateAuthToken();

  return res.status(200).json({ token: token });
});

module.exports = router;

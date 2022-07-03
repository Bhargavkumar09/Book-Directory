const router = require("express").Router();
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");
const { User, validateUser } = require("../models/User");

router.get("/", [authorization, isAdmin], async (req, res) => {
  const users = await User.find();
  users && res.status(200).json(users);
});

router.get("/:id", [authorization, isAdmin], async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(404).json({ message: "user not found" });
  res.status(200).json(user);
});

router.put("/:id", authorization, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(404).json({ message: "user not found" });
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();
  res.status(200).json({ message: "updated successfully", user });
});

router.delete("/:id", authorization, async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  if (!user) return res.status(404).json({ message: "user not found" });
  res.status(200).json({ message: "user deleted successfully" });
});
module.exports = router;

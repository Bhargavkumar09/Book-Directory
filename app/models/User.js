const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const payload = {
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  return Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^&*-+_;./>:}/|]).{8,64}$/
      )
      .required(),
  }).validate(user);
}

// exports.validateUser = validateUser;
// exports.User = User;

module.exports = { User, validateUser };

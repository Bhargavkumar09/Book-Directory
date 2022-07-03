require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const auth = require("./app/routes/auth");
const home = require("./app/routes/home");
const user = require("./app/routes/user");
const error = require("./app/middleware/error");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/home", home);
app.use("/api/user", user);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`listening on port:${process.env.PORT}`);
});

const router = require("express").Router();
const {Book,bookValidate} = require("../models/Book");
const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");
const lodash = require("lodash");
const multer = require("multer");

const storage = multer.memoryStorage({dest: "uploads/"});
const upload = multer(storage);

router.get("/", authorization, async (req, res) => {
  const results = await Book.find();
  return res.json(results);
});

router.post("/", [authorization, isAdmin], async (req, res) => {
  const { error } = bookValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({ ...req.body, uploadBy: req.user._id });
  await book.save();
  res.send(book);
});

router.post(
  "/upload",
  [auth, admin],
  upload.array("file", 2),
  async (req, res) => {
    const result = await s3storage("books", req.files[0]);
    res.json({ status: "sucess", result });
  });

  module.exports = router;

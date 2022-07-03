const router = require("express").Router();
const Book = require("../models/Book");
const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");
const lodash = require("lodash");

router.get("/", authorization, async (req, res) => {
  const results = await Book.find();
  return res.json(results);
});

router.post("/upload", [authorization, isAdmin], async (req, res) => {
  const book = new Book(
    _.pick(req.body, [
      "name",
      "language",
      "pages",
      "imageURL",
      "pdfURL",
      "publisher",
      "publicationDate",
    ])
  );
  try {
    const result = await book.save();
    return res.status(200).json({ result });
  } catch (e) {
    res.status(400).json({ message: "fill all details properly" });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
  name: String,
  language: String,
  pages: Number,
  imageURL: String,
  pdfURL: String,
  publisher: String,
  publicationDate: { type: Date, default: Date.now },
  uploadBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Book = mongoose.model("book", bookSchema);

function bookValidate() {
  const schema = Joi.object({
    name: Joi.string().required(),
    languages: Joi.string().required(),
    pages: Joi.number().required(),
    imageURL: Joi.string().required(),
    pdfURL: Joi.string().required(),
    publisher: Joi.string().required(),
    publicationDate: Joi.date().required().default(Date.now),
    uploadBy: Joi.string().required(),
  });
}

module.exports = Book;

const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// GET all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;

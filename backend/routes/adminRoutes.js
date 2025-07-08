const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Order = require("../models/Order");
const adminOnly = require("../middleware/admin");

// Get all books
router.get("/books", adminOnly, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a new book
router.post("/books", adminOnly, async (req, res) => {
  const { title, author, price } = req.body;
  const newBook = new Book({ title, author, price });
  await newBook.save();
  res.json(newBook);
});

// Delete a book
router.delete("/books/:id", adminOnly, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

// Get all orders
router.get("/orders", adminOnly, async (req, res) => {
  const orders = await Order.find().populate("items.bookId");
  res.json(orders);
});

module.exports = router;

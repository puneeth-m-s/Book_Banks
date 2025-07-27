const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Order = require("../models/Order");
const verifyToken = require("../middleware/auth");

// Middleware to check admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only." });
  }
  next();
};

/**
 * GET /api/admin/books
 * Fetch all books
 */
router.get("/books", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * POST /api/admin/books
 * Create a new book
 */
router.post("/books", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, author, price } = req.body;
    if (!title || !author || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBook = new Book({ title, author, price });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE /api/admin/books/:id
 * Delete a book by ID
 */
router.delete("/books/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/admin/orders
 * Fetch all orders with user emails
 */
router.get("/orders", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "email");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

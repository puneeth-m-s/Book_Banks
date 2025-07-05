const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const verifyToken = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

// Get all users
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get all orders
router.get("/orders", verifyToken, isAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;

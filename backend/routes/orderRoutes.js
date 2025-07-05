const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth"); // Make sure this path is correct
const Order = require("../models/Order");

// Get orders for the logged-in user
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get orders." });
  }
});

module.exports = router;

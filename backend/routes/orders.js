const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/auth");

// Create a new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = new Order({
      userId: req.user.id,
      items,
      total
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating order." });
  }
});

// Get all orders for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching orders." });
  }
});


module.exports = router;

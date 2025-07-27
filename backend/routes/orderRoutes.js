const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");

router.get("/all", verifyToken, async (req, res) => {
  try {
    // Only admins can access
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const orders = await Order.find().populate("user", "email");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

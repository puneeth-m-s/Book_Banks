const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
const bcrypt = require("bcrypt");

// Get current user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
});

// Update user info
router.put("/me", verifyToken, async (req, res) => {
  try {
    const { name, password } = req.body;

    const update = {};
    if (name) update.name = name;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      update.password = hashed;
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user info" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Unique file name: userId + timestamp + ext
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// POST /api/users/me/avatar
router.post(
  "/me/avatar",
  verifyToken,
  upload.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;

    await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl });

    res.json({ message: "Avatar uploaded successfully.", avatar: avatarUrl });
  }
);

module.exports = router;

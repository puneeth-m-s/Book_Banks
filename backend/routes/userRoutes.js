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
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .jpg, .png images are allowed"));
    }
  }
});


// ✅ GET /api/users/me - Get current user profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST /api/users/me/avatar - Upload avatar
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

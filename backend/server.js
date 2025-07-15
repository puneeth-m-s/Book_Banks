const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", require("./routes/orders"));
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));


// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB connection error:", err));

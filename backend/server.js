// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // frontend vite runs here
  credentials: true
}));

// Connect MongoDB (we’ll do next step)
mongoose.connect("mongodb://127.0.0.1:27017/purplerabbit")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

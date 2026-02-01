import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import path from "path";

//import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import wishlistRoute from "./routes/wishlist.js"

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Serve index.html for any other routes
app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html")),
);
// Routes
app.get("/api", (_, res) => {
  res.status(200).json({
    message: "Api [PurpleRabbit]",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/wishlist",wishlistRoute);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Connect DB & Start Server
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    server.listen(process.env.PORT, () => {
      console.log(
        `Server running on https://purplerabbit.onrender.com:${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js"
import { ERRORS } from "./utils/error.types.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,"../frontend/dist")));

// Serve index.html for any other routes
app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
);
// Routes
app.get("/api", (_, res) => {
  res.status(200).json({
    message: "Api [PurpleRabbit]",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// app.use("/*", (_, res) => {
//   console.log("wild-route-hit");
//   res.status(403).json({
//     error: ERRORS.METHOD_NOT_ALLOWED,
//   });
// });

// Connect DB & Start Server
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });

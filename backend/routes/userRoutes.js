import express from "express";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();

router.get("/admin", validateToken,roles("admin"), (req, res) => {
  res.json({ message: "admin login" });
});
router.get("/user", validateToken,roles("user","admin"), (req, res) => {
  res.json({ message: "user login" });
});

export default router;

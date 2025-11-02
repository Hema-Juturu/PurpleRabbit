import express from "express";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
import { getAllUsers,getUser,updateUser,deleteUser } from "../Controllers/userController.js";
const router = express.Router();

router.get("/admin", validateToken,roles("admin"), (req, res) => {
  res.json({ message: "admin login" });
});
router.get("/user", validateToken,roles("user","admin"), (req, res) => {
  res.json({ message: "user login" });
});

router.get("/getAllUsers",validateToken,roles("admin"),getAllUsers);
router.get("/getUser",validateToken,roles("user","admin"),getUser);
router.put("/updateUser", validateToken, updateUser);
router.delete("/deleteUser", validateToken, deleteUser);


export default router;

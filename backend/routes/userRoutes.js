import express from "express";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
import { getAllUsers,getUser,updateUser,deleteUser,getProfile,updatePassword,updateProfile } from "../Controllers/userController.js";
const router = express.Router();

router.get("/admin", validateToken,roles("admin"), (req, res) => {
  res.json({ message: "admin login" });
});
router.get("/user", validateToken,roles("user","admin"), (req, res) => {
  res.json({ message: "user login" });
});



router.get("/", validateToken, roles("admin"), getAllUsers); // GET /api/user
router.get("/:id", validateToken, roles("admin", "user"), getUser); // GET /api/user/:id
router.put("/:id", validateToken, roles("admin", "user"), updateUser); // PUT /api/user/:id
router.delete("/:id", validateToken, roles("admin"), deleteUser); // DELETE /api/user/:id

// ✅ Self-service routes
router.get("/me/profile", validateToken, getProfile); // GET /api/user/me/profile
router.put("/me/update", validateToken, updateProfile); // PUT /api/user/me/update
router.put("/me/password", validateToken, updatePassword); // PUT /api/user/me/password


export default router;

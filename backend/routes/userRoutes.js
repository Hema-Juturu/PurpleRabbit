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



router.get("/", validateToken, roles("admin"), getAllUsers); // GET /api/users
router.get("/:id", validateToken, roles("admin", "user"), getUser); // GET /api/users/:id
router.put("/:id", validateToken, roles("admin", "user"), updateUser); // PUT /api/users/:id
router.delete("/:id", validateToken, roles("admin"), deleteUser); // DELETE /api/users/:id

// ✅ Self-service routes
router.get("/me/profile", validateToken, getProfile); // GET /api/users/me/profile
router.put("/me/update", validateToken, updateProfile); // PUT /api/users/me/update
router.put("/me/password", validateToken, updatePassword); // PUT /api/users/me/password


export default router;

import express from "express";
import { toggleWishlist,getWishlist } from "../Controllers/wishlistController.js";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router=express.Router();

router.get("/",validateToken,roles("user","admin"),getWishlist);
router.post("/toggle",validateToken,roles("user","admin"),toggleWishlist);

export default router;
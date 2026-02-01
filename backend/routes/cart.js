import express from "express";

import { addToCart,getCart,removeFromCart,updateCartItem } from "../Controllers/cartController.js";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";

const router = express.Router();

router.get("/",validateToken, roles("admin", "user"), getCart);
router.post("/add",validateToken, roles("admin", "user"), addToCart);
router.put("/update", validateToken, roles("admin", "user"), updateCartItem);
router.delete("/:productId", validateToken, roles("admin", "user"), removeFromCart);

export default router;

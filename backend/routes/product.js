import express from "express";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
const router = express.Router();
import { createProduct,getAllProducts } from "../Controllers/productController.js";

router.post("/", validateToken, roles("admin"), createProduct); 
router.get("/", validateToken, roles("admin"), getAllProducts); 

export default router;

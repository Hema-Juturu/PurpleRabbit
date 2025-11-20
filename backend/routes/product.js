import express from "express";
import { validateToken } from "../middleware/auth.js";
import { roles } from "../middleware/roles.js";
const router = express.Router();
import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct } from "../Controllers/productController.js";

router.post("/", validateToken, roles("admin"), createProduct); 
router.get("/", validateToken, roles("admin"), getAllProducts); 
router.get("/:id", validateToken, roles("admin"), getProductById); 
router.put("/:id", validateToken, roles("admin"), updateProduct); 
router.delete("/:id", validateToken, roles("admin"), deleteProduct); 

export default router;

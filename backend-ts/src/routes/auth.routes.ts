import { Router, Request, Response } from "express";
import { sendOtp, verifyOtp } from "../controllers/auth.controller.js";
import { validateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/protected", validateToken, (req: Request, res: Response) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

export default router;
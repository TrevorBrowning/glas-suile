import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController"; // <-- FIX
import { protect } from "../middleware/authMiddleware"; // <-- FIX

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;

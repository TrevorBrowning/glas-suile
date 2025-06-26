import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createProject } from "../controllers/projectController";

const router = Router();

router.post("/", protect, createProject);

export default router;

import express from "express";
import { getMoodData, logMood } from "../controllers/moodController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMoodData);
router.post("/", authMiddleware, logMood);

export default router;

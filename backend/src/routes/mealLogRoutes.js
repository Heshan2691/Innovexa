import express from "express";
import { logMeals, getMealLogs } from "../controllers/mealLogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, logMeals);
router.get("/", authMiddleware, getMealLogs);

export default router;

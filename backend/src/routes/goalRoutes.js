import express from "express";
import { getUserGoal, setUserGoal } from "../controllers/goalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUserGoal);
router.post("/", authMiddleware, setUserGoal);

export default router;

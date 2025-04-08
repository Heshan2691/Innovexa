import express from "express";
import {
  addMeal,
  getMeals,
  getSavedMeals,
} from "../controllers/mealController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addMeal);
router.get("/", authMiddleware, getMeals);
router.get("/saved", authMiddleware, getSavedMeals); // New route for saved meals

export default router;

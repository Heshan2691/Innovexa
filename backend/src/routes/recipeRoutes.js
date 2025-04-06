import express from "express";
import {
  getHealthyRecipes,
  getRecipeDetails,
} from "../controllers/recipeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/healthy", authMiddleware, getHealthyRecipes);
router.get("/:id", authMiddleware, getRecipeDetails);

export default router;

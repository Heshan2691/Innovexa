import express from "express";
import {
  getMealBlogs,
  createMealBlog,
} from "../controllers/mealBlogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route: Get all meal blogs
router.get("/", getMealBlogs);

// Protected route: Create a new meal blog (admin only, but we'll skip admin check for now)
router.post("/", authMiddleware, createMealBlog);

export default router;

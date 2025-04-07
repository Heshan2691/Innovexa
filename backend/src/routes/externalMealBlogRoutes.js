import express from "express";
import { getExternalMealBlogs } from "../controllers/externalMealBlogController.js";

const router = express.Router();

// Public route: Fetch meal blogs from NewsAPI
router.get("/", getExternalMealBlogs);

export default router;

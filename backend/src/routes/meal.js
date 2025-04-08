import { Router } from "express";
import Meal from "../models/Meal.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Create a new meal (POST /api/meals) - Protected
router.post("/", authMiddleware, async (req, res) => {
  try {
    const mealData = {
      ...req.body,
      userId: req.user.id, // Associate meal with the logged-in user
    };
    const meal = new Meal(mealData);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    console.error("Error creating meal:", error);
    res.status(400).json({ message: "Error creating meal", error });
  }
});

// Get all meals for the logged-in user (GET /api/meals) - Protected
router.get("/", authMiddleware, async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user.id }).populate(
      "userId",
      "name email"
    );
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a meal by ID (GET /api/meals/:id) - Protected
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    if (meal.userId._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this meal" });
    }
    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a meal by ID (PUT /api/meals/:id) - Protected
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    if (meal.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this meal" });
    }
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedMeal);
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(400).json({ message: "Error updating meal", error });
  }
});

// Delete a meal by ID (DELETE /api/meals/:id) - Protected
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    if (meal.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this meal" });
    }
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

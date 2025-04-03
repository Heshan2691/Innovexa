import { Router } from "express";
import Meal from "../models/Meal.js";

const router = Router();

// Create a new meal (POST /api/meals)
router.post("/", async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    console.error("Error creating meal:", error);
    res.status(400).json({ message: "Error creating meal", error });
  }
});

// Read all meals (GET /api/meals)
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find().populate("user", "name email");
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Read a single meal by ID (GET /api/meals/:id)
router.get("/:id", async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a meal by ID (PUT /api/meals/:id)
router.put("/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json(meal);
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(400).json({ message: "Error updating meal", error });
  }
});

// Delete a meal by ID (DELETE /api/meals/:id)
router.delete("/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json({ message: "Meal deleted" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

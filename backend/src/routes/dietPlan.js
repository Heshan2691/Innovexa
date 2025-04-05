import { Router } from "express";
import DietPlan from "../models/DietPlan.js";
import Meal from "../models/Meal.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { generateDietPlan } from "../controllers/dietPlanController.js";

const router = Router();

// Generate a new diet plan (POST /api/diet-plans/generate) - Protected
router.post("/generate", authMiddleware, generateDietPlan);

// Get all diet plans for the logged-in user (GET /api/diet-plans) - Protected
router.get("/", authMiddleware, async (req, res) => {
  try {
    const dietPlans = await DietPlan.find({ userId: req.user.id })
      .populate("userId", "name email")
      .populate("meals");
    res.json(dietPlans);
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a diet plan by ID (GET /api/diet-plans/:id) - Protected
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id)
      .populate("userId", "name email")
      .populate("meals");
    if (!dietPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }
    if (dietPlan.userId._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this diet plan" });
    }
    res.json(dietPlan);
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a diet plan by ID (PUT /api/diet-plans/:id) - Protected
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id);
    if (!dietPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }
    if (dietPlan.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this diet plan" });
    }

    const { meals } = req.body;
    let updateData = req.body;
    if (meals) {
      const mealDocs = await Meal.find({ _id: { $in: meals } });
      const totalCalories = mealDocs.reduce(
        (sum, meal) => sum + meal.calories,
        0
      );
      updateData.totalCalories = totalCalories;
    }

    const updatedDietPlan = await DietPlan.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("meals");
    res.json(updatedDietPlan);
  } catch (error) {
    console.error("Error updating diet plan:", error);
    res.status(400).json({ message: "Error updating diet plan", error });
  }
});

// Delete a diet plan by ID (DELETE /api/diet-plans/:id) - Protected
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id);
    if (!dietPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }
    if (dietPlan.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this diet plan" });
    }
    await DietPlan.findByIdAndDelete(req.params.id);
    res.json({ message: "Diet plan deleted" });
  } catch (error) {
    console.error("Error deleting diet plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

import { Router } from "express";
import DietPlan from "../models/DietPlan.js";
import Meal from "../models/Meal.js";

const router = Router();

// Create a new diet plan (POST /api/diet-plans)
router.post("/", async (req, res) => {
  try {
    const { user, date, meals } = req.body;

    // Calculate total calories from meals
    const mealDocs = await Meal.find({ _id: { $in: meals } });
    const totalCalories = mealDocs.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );

    const dietPlan = new DietPlan({
      user,
      date,
      meals,
      totalCalories,
    });

    await dietPlan.save();
    res.status(201).json(dietPlan);
  } catch (error) {
    console.error("Error creating diet plan:", error);
    res.status(400).json({ message: "Error creating diet plan", error });
  }
});

// Read all diet plans (GET /api/diet-plans)
router.get("/", async (req, res) => {
  try {
    const dietPlans = await DietPlan.find()
      .populate("user", "name email")
      .populate("meals");
    res.json(dietPlans);
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Read a single diet plan by ID (GET /api/diet-plans/:id)
router.get("/:id", async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id)
      .populate("user", "name email")
      .populate("meals");
    if (!dietPlan)
      return res.status(404).json({ message: "Diet plan not found" });
    res.json(dietPlan);
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a diet plan by ID (PUT /api/diet-plans/:id)
router.put("/:id", async (req, res) => {
  try {
    const { meals } = req.body;

    // Recalculate total calories if meals are updated
    if (meals) {
      const mealDocs = await Meal.find({ _id: { $in: meals } });
      req.body.totalCalories = mealDocs.reduce(
        (sum, meal) => sum + meal.calories,
        0
      );
    }

    const dietPlan = await DietPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user", "name email")
      .populate("meals");
    if (!dietPlan)
      return res.status(404).json({ message: "Diet plan not found" });
    res.json(dietPlan);
  } catch (error) {
    console.error("Error updating diet plan:", error);
    res.status(400).json({ message: "Error updating diet plan", error });
  }
});

// Delete a diet plan by ID (DELETE /api/diet-plans/:id)
router.delete("/:id", async (req, res) => {
  try {
    const dietPlan = await DietPlan.findByIdAndDelete(req.params.id);
    if (!dietPlan)
      return res.status(404).json({ message: "Diet plan not found" });
    res.json({ message: "Diet plan deleted" });
  } catch (error) {
    console.error("Error deleting diet plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

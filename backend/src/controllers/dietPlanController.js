import DietPlan from "../models/DietPlan.js";
import Meal from "../models/Meal.js";
import User from "../models/User.js";

export const generateDietPlan = async (req, res) => {
  try {
    const { date } = req.body;
    const userId = req.user.id;

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch meals for the user
    const meals = await Meal.find({ userId });

    // Simple logic to generate a diet plan based on health goals
    let targetCalories;
    if (user.healthGoals === "weight-loss") {
      targetCalories = 1500; // Example target for weight loss
    } else if (user.healthGoals === "muscle-gain") {
      targetCalories = 2500; // Example target for muscle gain
    } else {
      targetCalories = 2000; // Example target for maintenance
    }

    let selectedMeals = [];
    let currentCalories = 0;

    for (const meal of meals) {
      if (currentCalories + meal.calories <= targetCalories) {
        selectedMeals.push(meal._id);
        currentCalories += meal.calories;
      }
      if (currentCalories >= targetCalories * 0.9) break; // Stop when close to target
    }

    if (selectedMeals.length === 0) {
      return res
        .status(400)
        .json({ message: "No meals available to create a diet plan" });
    }

    // Create the diet plan
    const dietPlan = new DietPlan({
      userId,
      date,
      meals: selectedMeals,
      totalCalories: currentCalories,
    });

    await dietPlan.save();

    const populatedDietPlan = await DietPlan.findById(dietPlan._id)
      .populate("userId", "name email")
      .populate("meals");

    res.status(201).json(populatedDietPlan);
  } catch (error) {
    console.error("Error generating diet plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

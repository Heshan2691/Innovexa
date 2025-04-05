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

    // Calculate BMR (assuming male for simplicity; add gender field if needed)
    const { age, weight, height, healthGoals } = user;
    if (!age || !weight || !height) {
      return res
        .status(400)
        .json({
          message: "Please complete your profile (age, weight, height)",
        });
    }
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Mifflin-St Jeor for men

    // Adjust BMR based on activity level (default: moderately active)
    const activityMultiplier = 1.55; // Moderately active
    let targetCalories = bmr * activityMultiplier;

    // Adjust calorie target based on health goals
    if (healthGoals === "weight-loss") {
      targetCalories -= 500; // Deficit for weight loss
    } else if (healthGoals === "muscle-gain") {
      targetCalories += 500; // Surplus for muscle gain
    }

    // Fetch meals for the user
    const meals = await Meal.find({ userId });
    if (meals.length === 0) {
      return res
        .status(400)
        .json({ message: "No meals available to create a diet plan" });
    }

    // Define ideal macro percentages based on health goals
    let idealMacros;
    if (healthGoals === "weight-loss") {
      idealMacros = { protein: 40, carbs: 30, fats: 30 };
    } else if (healthGoals === "muscle-gain") {
      idealMacros = { protein: 40, carbs: 40, fats: 20 };
    } else {
      idealMacros = { protein: 30, carbs: 40, fats: 30 };
    }

    // Score meals based on macro alignment
    const scoredMeals = meals.map((meal) => {
      // Calculate total calories from macros
      const proteinCalories = (meal.protein || 0) * 4;
      const carbsCalories = (meal.carbs || 0) * 4;
      const fatsCalories = (meal.fats || 0) * 9;
      const totalMacroCalories = proteinCalories + carbsCalories + fatsCalories;

      // Calculate macro percentages
      const proteinPercent =
        totalMacroCalories > 0
          ? (proteinCalories / totalMacroCalories) * 100
          : 0;
      const carbsPercent =
        totalMacroCalories > 0 ? (carbsCalories / totalMacroCalories) * 100 : 0;
      const fatsPercent =
        totalMacroCalories > 0 ? (fatsCalories / totalMacroCalories) * 100 : 0;

      // Calculate score based on deviation from ideal percentages
      const proteinDiff = Math.abs(proteinPercent - idealMacros.protein);
      const carbsDiff = Math.abs(carbsPercent - idealMacros.carbs);
      const fatsDiff = Math.abs(fatsPercent - idealMacros.fats);
      const totalDiff = proteinDiff + carbsDiff + fatsDiff;
      const score = Math.max(0, 100 - totalDiff); // Score out of 100

      return { meal, score };
    });

    // Sort meals by score (highest first)
    scoredMeals.sort((a, b) => b.score - a.score);

    // Select meals to meet the calorie target
    let selectedMeals = [];
    let currentCalories = 0;
    for (const { meal } of scoredMeals) {
      if (currentCalories + meal.calories <= targetCalories) {
        selectedMeals.push(meal._id);
        currentCalories += meal.calories;
      }
      if (currentCalories >= targetCalories * 0.9) break; // Stop when close to target
    }

    if (selectedMeals.length === 0) {
      return res
        .status(400)
        .json({ message: "No suitable meals found within calorie target" });
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

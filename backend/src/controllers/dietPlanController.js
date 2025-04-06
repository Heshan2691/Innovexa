import axios from "axios";
import mongoose from "mongoose";
import DietPlan from "../models/DietPlan.js";
import Meal from "../models/Meal.js";
import User from "../models/User.js";

// Helper function to fetch recipe image from Spoonacular
const fetchRecipeImage = async (recipeId) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    return response.data.image || ""; // Return the image URL or empty string if not found
  } catch (error) {
    console.error(
      `Error fetching image for recipe ${recipeId}:`,
      error.message
    );
    return ""; // Return empty string on error
  }
};

// Helper function to generate a single day's meal plan using Spoonacular
const generateSingleDayPlan = async (
  userId,
  targetCalories,
  healthGoals,
  diet,
  exclude
) => {
  let spoonacularMeals = [];
  let totalCalories = 0;
  try {
    const spoonacularResponse = await axios.get(
      "https://api.spoonacular.com/mealplanner/generate",
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          timeFrame: "day",
          targetCalories: Math.round(targetCalories),
          diet: diet || mapHealthGoalsToDiet(healthGoals),
          exclude: exclude || "",
        },
      }
    );

    console.log(
      "Spoonacular API Response:",
      JSON.stringify(spoonacularResponse.data, null, 2)
    );
    spoonacularMeals = spoonacularResponse.data.meals || [];
    if (!spoonacularMeals.length) {
      throw new Error("No meals returned from Spoonacular API");
    }
    totalCalories = spoonacularResponse.data.nutrients?.calories || 0;
    console.log(
      "Remaining API Quota:",
      spoonacularResponse.headers["x-api-quota-left"]
    );
  } catch (spoonacularError) {
    console.error(
      "Spoonacular API error:",
      spoonacularError.response?.data || spoonacularError.message
    );
    if (spoonacularError.response?.status === 402) {
      console.error(
        "Spoonacular API rate limit exceeded. Falling back to local recommendations."
      );
    }
    // Fallback to rule-based logic
    const meals = await Meal.find({ userId });
    if (meals.length === 0) {
      throw new Error(
        "No meals available to create a diet plan. Spoonacular API limit may have been exceeded."
      );
    }

    let idealMacros;
    if (healthGoals === "weight-loss") {
      idealMacros = { protein: 40, carbs: 30, fats: 30 };
    } else if (healthGoals === "muscle-gain") {
      idealMacros = { protein: 40, carbs: 40, fats: 20 };
    } else {
      idealMacros = { protein: 30, carbs: 40, fats: 30 };
    }

    const scoredMeals = meals.map((meal) => {
      const proteinCalories = (meal.protein || 0) * 4;
      const carbsCalories = (meal.carbs || 0) * 4;
      const fatsCalories = (meal.fats || 0) * 9;
      const totalMacroCalories = proteinCalories + carbsCalories + fatsCalories;

      const proteinPercent =
        totalMacroCalories > 0
          ? (proteinCalories / totalMacroCalories) * 100
          : 0;
      const carbsPercent =
        totalMacroCalories > 0 ? (carbsCalories / totalMacroCalories) * 100 : 0;
      const fatsPercent =
        totalMacroCalories > 0 ? (fatsCalories / totalMacroCalories) * 100 : 0;

      const proteinDiff = Math.abs(proteinPercent - idealMacros.protein);
      const carbsDiff = Math.abs(carbsPercent - idealMacros.carbs);
      const fatsDiff = Math.abs(fatsPercent - idealMacros.fats);
      const totalDiff = proteinDiff + carbsDiff + fatsDiff;
      const score = Math.max(0, 100 - totalDiff);

      return { meal, score };
    });

    scoredMeals.sort((a, b) => b.score - a.score);

    const selectedMeals = [];
    let currentCalories = 0;
    for (const { meal } of scoredMeals) {
      if (currentCalories + meal.calories <= targetCalories) {
        selectedMeals.push(meal._id);
        currentCalories += meal.calories;
      }
      if (currentCalories >= targetCalories * 0.9) break;
    }

    if (selectedMeals.length === 0) {
      throw new Error("No suitable meals found within calorie target");
    }

    return {
      meals: selectedMeals,
      totalCalories: currentCalories,
      isFallback: true,
    };
  }

  // Map Spoonacular meals to your Meal model
  const mealIds = [];
  for (const spoonacularMeal of spoonacularMeals) {
    const nutrients = spoonacularMeal.nutrition?.nutrients || [];
    const nutrientMap = nutrients.reduce(
      (acc, nutrient) => {
        if (nutrient.name === "Protein") acc.protein = nutrient.amount;
        if (nutrient.name === "Carbohydrates") acc.carbs = nutrient.amount;
        if (nutrient.name === "Fat") acc.fats = nutrient.amount;
        return acc;
      },
      { protein: 0, carbs: 0, fats: 0 }
    );

    const calories = nutrients.find((n) => n.name === "Calories")?.amount || 0;

    // Fetch the image URL for the recipe
    const imageUrl = await fetchRecipeImage(spoonacularMeal.id);

    const meal = new Meal({
      userId,
      name: spoonacularMeal.title || "Unknown Meal",
      calories: calories,
      protein: nutrientMap.protein,
      carbs: nutrientMap.carbs,
      fats: nutrientMap.fats,
      source: "Spoonacular",
      sourceUrl: spoonacularMeal.sourceUrl || "",
      imageUrl, // Store the image URL
    });

    await meal.save();
    mealIds.push(meal._id);
  }

  return { meals: mealIds, totalCalories, isFallback: false };
};

// Generate a 3-day diet plan
export const generateDietPlan = async (req, res) => {
  try {
    const { startDate, diet, exclude } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { age, weight, height, healthGoals } = user;
    if (!age || !weight || !height) {
      return res
        .status(400)
        .json({
          message: "Please complete your profile (age, weight, height)",
        });
    }
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const activityMultiplier = 1.55;
    let targetCalories = bmr * activityMultiplier;

    if (healthGoals === "weight-loss") {
      targetCalories -= 500;
    } else if (healthGoals === "muscle-gain") {
      targetCalories += 500;
    }

    // Generate a unique planId for this 3-day plan
    const planId = new mongoose.Types.ObjectId();

    // Generate plans for 3 consecutive days
    const dietPlans = [];
    let isFallback = false;
    for (let day = 1; day <= 3; day++) {
      const dayDate = new Date(startDate);
      dayDate.setDate(dayDate.getDate() + (day - 1)); // Increment date for each day

      const {
        meals,
        totalCalories,
        isFallback: dayIsFallback,
      } = await generateSingleDayPlan(
        userId,
        targetCalories,
        healthGoals,
        diet,
        exclude
      );

      if (dayIsFallback) isFallback = true;

      const dietPlan = new DietPlan({
        userId,
        date: dayDate,
        dayNumber: day,
        planId,
        meals,
        totalCalories,
      });

      await dietPlan.save();
      const populatedDietPlan = await DietPlan.findById(dietPlan._id)
        .populate("userId", "name email")
        .populate("meals");
      dietPlans.push(populatedDietPlan);
    }

    res.status(201).json({ dietPlans, isFallback });
  } catch (error) {
    console.error("Error generating diet plan:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Regenerate a specific day's plan
export const regenerateDayPlan = async (req, res) => {
  try {
    const { planId, dayNumber } = req.params;
    const { diet, exclude } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { age, weight, height, healthGoals } = user;
    if (!age || !weight || !height) {
      return res
        .status(400)
        .json({
          message: "Please complete your profile (age, weight, height)",
        });
    }
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const activityMultiplier = 1.55;
    let targetCalories = bmr * activityMultiplier;

    if (healthGoals === "weight-loss") {
      targetCalories -= 500;
    } else if (healthGoals === "muscle-gain") {
      targetCalories += 500;
    }

    // Find the existing diet plan for the specified day
    const existingPlan = await DietPlan.findOne({ planId, dayNumber, userId });
    if (!existingPlan) {
      return res
        .status(404)
        .json({ message: "Diet plan not found for the specified day" });
    }

    // Generate a new plan for the day
    const { meals, totalCalories, isFallback } = await generateSingleDayPlan(
      userId,
      targetCalories,
      healthGoals,
      diet,
      exclude
    );

    // Update the existing plan
    existingPlan.meals = meals;
    existingPlan.totalCalories = totalCalories;
    await existingPlan.save();

    const populatedDietPlan = await DietPlan.findById(existingPlan._id)
      .populate("userId", "name email")
      .populate("meals");

    res.status(200).json({ dietPlan: populatedDietPlan, isFallback });
  } catch (error) {
    console.error("Error regenerating diet plan:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch the latest 3-day plan for the user
export const getLatestDietPlan = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the most recent planId for the user
    const latestPlan = await DietPlan.findOne({ userId })
      .sort({ date: -1 }) // Sort by date descending to get the most recent
      .select("planId");

    if (!latestPlan) {
      return res.status(200).json({ dietPlans: [] });
    }

    // Fetch all diet plans with the same planId
    const dietPlans = await DietPlan.find({ planId: latestPlan.planId, userId })
      .populate("userId", "name email")
      .populate("meals")
      .sort({ dayNumber: 1 }); // Sort by dayNumber ascending

    res.status(200).json({ dietPlans });
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const mapHealthGoalsToDiet = (healthGoals) => {
  switch (healthGoals) {
    case "weight-loss":
      return "lowcarb";
    case "muscle-gain":
      return "highprotein";
    default:
      return "";
  }
};

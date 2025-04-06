import axios from "axios";
import DietPlan from "../models/DietPlan.js";
import Meal from "../models/Meal.js";
import User from "../models/User.js";

export const generateDietPlan = async (req, res) => {
  try {
    const { date, diet, exclude } = req.body;
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
      console.error("Spoonacular API error:", spoonacularError.message);
      // Fallback to rule-based logic
      const meals = await Meal.find({ userId });
      if (meals.length === 0) {
        return res
          .status(400)
          .json({ message: "No meals available to create a diet plan" });
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
        const totalMacroCalories =
          proteinCalories + carbsCalories + fatsCalories;

        const proteinPercent =
          totalMacroCalories > 0
            ? (proteinCalories / totalMacroCalories) * 100
            : 0;
        const carbsPercent =
          totalMacroCalories > 0
            ? (carbsCalories / totalMacroCalories) * 100
            : 0;
        const fatsPercent =
          totalMacroCalories > 0
            ? (fatsCalories / totalMacroCalories) * 100
            : 0;

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
        return res
          .status(400)
          .json({ message: "No suitable meals found within calorie target" });
      }

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
      return res.status(201).json(populatedDietPlan);
    }

    // Map Spoonacular meals to your Meal model
    const mealIds = [];
    for (const spoonacularMeal of spoonacularMeals) {
      // Extract nutritional data with defensive checks
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

      const calories =
        nutrients.find((n) => n.name === "Calories")?.amount || 0;

      const meal = new Meal({
        userId,
        name: spoonacularMeal.title || "Unknown Meal",
        calories: calories,
        protein: nutrientMap.protein,
        carbs: nutrientMap.carbs,
        fats: nutrientMap.fats,
        source: "Spoonacular",
        sourceUrl: spoonacularMeal.sourceUrl || "",
      });

      await meal.save();
      mealIds.push(meal._id);
    }

    const dietPlan = new DietPlan({
      userId,
      date,
      meals: mealIds,
      totalCalories,
    });

    await dietPlan.save();

    const populatedDietPlan = await DietPlan.findById(dietPlan._id)
      .populate("userId", "name email")
      .populate("meals");

    res.status(201).json(populatedDietPlan);
  } catch (error) {
    console.error("Error generating diet plan:", error);
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

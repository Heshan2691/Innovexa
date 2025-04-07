import Meal from "../models/Meal.js";

// Existing function: Add a new meal
export const addMeal = async (req, res) => {
  const { name, calories, protein, carbs, fats } = req.body;

  try {
    if (!name || !calories || !protein || !carbs || !fats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const meal = new Meal({
      user: req.user.id,
      name,
      calories,
      protein,
      carbs,
      fats,
    });

    await meal.save();

    res.status(201).json({ message: "Meal added successfully", meal });
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Existing function: Get all meals for the user
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// New function: Get saved meals for the user (same as getMeals for now)
export const getSavedMeals = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch meals for the authenticated user, sorted by date (most recent first)
    const savedMeals = await Meal.find({ user: userId }).sort({ date: -1 });

    res.status(200).json(savedMeals);
  } catch (error) {
    console.error("Error fetching saved meals:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

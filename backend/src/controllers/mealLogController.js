import MealLog from "../models/MealLog.js";

// Log meals for the user
export const logMeals = async (req, res) => {
  const { mealIds } = req.body;
  const userId = req.user.id;

  try {
    if (!mealIds || !Array.isArray(mealIds) || mealIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of meal IDs" });
    }

    // Check if there's already a log for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let mealLog = await MealLog.findOne({
      user: userId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (mealLog) {
      // Update existing log by adding new meals (avoid duplicates)
      mealLog.meals = [...new Set([...mealLog.meals, ...mealIds])];
    } else {
      // Create a new log
      mealLog = new MealLog({
        user: userId,
        meals: mealIds,
        date: new Date(),
      });
    }

    await mealLog.save();

    res.status(201).json({ message: "Meals logged successfully", mealLog });
  } catch (error) {
    console.error("Error logging meals:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch meal logs for the user
export const getMealLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const mealLogs = await MealLog.find({ user: userId })
      .populate("meals") // Populate the meals array with full meal details
      .sort({ date: -1 });

    res.status(200).json(mealLogs);
  } catch (error) {
    console.error("Error fetching meal logs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

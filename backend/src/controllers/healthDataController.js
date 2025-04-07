import HealthData from "../models/HealthData.js";

// Add health data for the user
export const addHealthData = async (req, res) => {
  const { bmi, waterIntake, sleepTime, steps, caloriesBurned, weight } =
    req.body;

  try {
    if (
      !bmi ||
      !waterIntake ||
      !sleepTime ||
      !steps ||
      !caloriesBurned ||
      !weight
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingEntry = await HealthData.findOne({
      user: userId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (existingEntry) {
      return res
        .status(400)
        .json({ message: "Health data for today already exists" });
    }

    const healthData = new HealthData({
      user: userId,
      bmi,
      waterIntake,
      sleepTime,
      steps,
      caloriesBurned,
      weight,
      date: new Date(),
    });

    await healthData.save();

    res
      .status(201)
      .json({ message: "Health data added successfully", healthData });
  } catch (error) {
    console.error("Error adding health data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch health data for the user
export const getHealthData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Optional query parameters for date range
    const { startDate, endDate } = req.query;

    let query = { user: userId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const healthData = await HealthData.find(query).sort({ date: -1 }); // Sort by date descending

    res.status(200).json(healthData);
  } catch (error) {
    console.error("Error fetching health data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

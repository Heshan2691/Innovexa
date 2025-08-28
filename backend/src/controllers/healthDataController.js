import HealthData from "../models/HealthData.js";

// Add health data for the user
export const addHealthData = async (req, res) => {
  const { bmi, waterIntake, sleepTime, steps, caloriesBurned, weight } = req.body;

  console.log("Received health data POST request:", req.body);

  try {
    if (!bmi || !waterIntake || !sleepTime || !steps || !caloriesBurned || !weight) {
      console.log("Missing required fields in health data POST request");
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user.id;
    console.log("Authenticated user ID:", userId);

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
      console.log("Health data for today already exists for user:", userId);
      return res.status(400).json({ message: "Health data for today already exists" });
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
    console.log("Health data saved for user:", userId);

    res.status(201).json({ message: "Health data added successfully", healthData });
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
    // If no startDate/endDate, just return all health data for the user
    const healthData = await HealthData.find(query).sort({ date: -1 }); // Sort by date descending
    res.status(200).json(healthData);
  } catch (error) {
    console.error("Error fetching health data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Meal from "../models/Meal.js";
import HealthData from "../models/HealthData.js";
import Mood from "../models/Mood.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, weight, height, healthGoals } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
      healthGoals,
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authMiddleware sets req.user
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

export const getHealthData = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    const healthData = await HealthData.find({
      user: userId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.status(200).json(healthData);
  } catch (error) {
    console.error("Error fetching health data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMoodData = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    const moodData = await Mood.find({
      userId: userId, // Update to use userId instead of user
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.status(200).json(moodData);
  } catch (error) {
    console.error("Error fetching mood data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("healthGoals"); // Update to healthGoals
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Map the enum value to a user-friendly string
    const goalMap = {
      "weight-loss": "Lose weight",
      "muscle-gain": "Gain muscle",
      maintenance: "Maintain health",
    };
    const userFriendlyGoal = goalMap[user.healthGoals] || "No goal set";

    res.status(200).json(userFriendlyGoal);
  } catch (error) {
    console.error("Error fetching user goal:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

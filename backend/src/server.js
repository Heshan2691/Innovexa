import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthTipsRouter from "./routes/healthTips.js";
import userRouter from "./routes/user.js"; // Add user routes
import mealRouter from "./routes/meal.js"; // Add meal routes
import dietPlanRouter from "./routes/dietPlan.js"; // Add diet plan routes
import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import healthDataRoutes from "./routes/healthDataRoutes.js";
import mealLogRoutes from "./routes/mealLogRoutes.js";
import mealBlogRoutes from "./routes/mealBlogRoutes.js";
import externalMealBlogRoutes from "./routes/externalMealBlogRoutes.js";
import foodAiRoutes from "./routes/foodAiRoutes.js";
import moodRoutes from "./routes/moodRoutes.js"; // Fix the path
import goalRoutes from "./routes/goalRoutes.js";
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins for now (for testing purposes)
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Health & Nutrition Tracker Backend!" });
});

app.use("/api/health-tips", healthTipsRouter);
app.use("/api/users", userRouter); // Mount user routes
app.use("/api/meals", mealRouter); // Mount meal routes
app.use("/api/diet-plans", dietPlanRouter); // Mount diet plan routes
app.use("/api/recipes", recipeRoutes); // Mount recipe routes
app.use("/api/health-data", healthDataRoutes); // Mount health data routes
app.use("/api/meal-logs", mealLogRoutes); // Mount meal log routes
app.use("/api/meal-blogs", mealBlogRoutes); // Mount meal blog routes
app.use("/api/external-meal-blogs", externalMealBlogRoutes); // Mount external meal blog routes
app.use("/api/food-ai", foodAiRoutes); // Mount food AI routes
app.use("/api/mood-data", moodRoutes); // Add this
app.use("/api/user/goal", goalRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

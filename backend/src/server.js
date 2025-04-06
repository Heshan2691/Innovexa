import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthTipsRouter from "./routes/healthTips.js";
import userRouter from "./routes/user.js"; // Add user routes
import mealRouter from "./routes/meal.js"; // Add meal routes
import dietPlanRouter from "./routes/dietPlan.js"; // Add diet plan routes
import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
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

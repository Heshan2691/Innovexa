import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Changed from 'user' to 'userId'
  date: { type: Date, required: true },
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  totalCalories: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

export default DietPlan;

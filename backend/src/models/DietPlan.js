import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  dayNumber: { type: Number, required: true }, // 1, 2, or 3
  planId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Groups the 3 days together
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  totalCalories: { type: Number, required: true },
});

export default mongoose.model("DietPlan", dietPlanSchema);

import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  date: { type: Date, required: true }, // Date of the diet plan
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }], // Array of meal references
  totalCalories: { type: Number, default: 0 }, // Sum of calories from meals
  createdAt: { type: Date, default: Date.now },
});

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

export default DietPlan;

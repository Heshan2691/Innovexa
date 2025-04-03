import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 }, // in grams
  carbs: { type: Number, default: 0 }, // in grams
  fats: { type: Number, default: 0 }, // in grams
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  createdAt: { type: Date, default: Date.now },
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;

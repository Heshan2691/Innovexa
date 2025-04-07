import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  source: { type: String, default: "User" },
  sourceUrl: { type: String },
  imageUrl: { type: String }, // New field to store the image URL
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model("Meal", mealSchema);

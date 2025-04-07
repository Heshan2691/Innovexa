import mongoose from "mongoose";

const mealLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: true,
    },
  ],
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model("MealLog", mealLogSchema);

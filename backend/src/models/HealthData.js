import mongoose from "mongoose";

const healthDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    bmi: {
      type: Number,
      required: true,
    },
    waterIntake: {
      type: Number, // in milliliters (mL)
      required: true,
    },
    sleepTime: {
      type: Number, // in hours
      required: true,
    },
    steps: {
      type: Number,
      required: true,
    },
    caloriesBurned: {
      type: Number, // in kcal
      required: true,
    },
    weight: {
      type: Number, // in kg
      required: true,
    },
    activeMinutes: {
      // Add this field
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("HealthData", healthDataSchema);

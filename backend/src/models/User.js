import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, hash this!
  age: { type: Number },
  weight: { type: Number }, // in kg
  height: { type: Number }, // in cm
  healthGoals: {
    type: String,
    enum: ["weight-loss", "muscle-gain", "maintenance"],
    default: "maintenance",
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;

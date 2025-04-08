import mongoose from "mongoose";

const healthTipSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  icon: { type: String, required: true },
  set: { type: String },
  text: { type: String, required: true },
});

const HealthTip = mongoose.model("healthTips", healthTipSchema);

export default HealthTip;

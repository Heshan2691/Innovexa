import { Router } from "express";
import HealthTip from "../models/HealthTip.js";

const router = Router();

// GET /api/health-tips
router.get("/", async (req, res) => {
  try {
    console.log("Fetching health tips from database...");
    const healthTips = await HealthTip.find();
    console.log("Health tips retrieved:", healthTips);
    res.json(healthTips);
  } catch (error) {
    console.error("Error fetching health tips:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

import Goal from "../models/Goal.js";

export const getUserGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    if (!goal) {
      return res.status(404).json({ message: "No goal found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch goal", error: error.message });
  }
};

export const setUserGoal = async (req, res) => {
  try {
    const { type, target, unit, startDate, endDate } = req.body;
    const newGoal = new Goal({
      userId: req.user.id,
      type,
      target,
      unit,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      current: 0, // Initial progress
    });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to set goal", error: error.message });
  }
};

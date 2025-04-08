import Mood from "../models/Mood.js";

export const getMoodData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      userId: req.user.id,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
    const moodData = await Mood.find(query).sort({ date: -1 });
    res.status(200).json(moodData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch mood data", error: error.message });
  }
};

export const logMood = async (req, res) => {
  try {
    const { mood, date } = req.body;
    const newMood = new Mood({
      userId: req.user.id,
      mood,
      date: new Date(date),
    });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to log mood", error: error.message });
  }
};

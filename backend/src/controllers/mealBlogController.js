import MealBlog from "../models/MealBlog.js";

// Get all meal blogs
export const getMealBlogs = async (req, res) => {
  try {
    const mealBlogs = await MealBlog.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(mealBlogs);
  } catch (error) {
    console.error("Error fetching meal blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new meal blog (admin only)
export const createMealBlog = async (req, res) => {
  const { title, content, author, image } = req.body;

  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newMealBlog = new MealBlog({
      title,
      content,
      author: author || "Admin",
      image,
    });

    await newMealBlog.save();
    res
      .status(201)
      .json({
        message: "Meal blog created successfully",
        mealBlog: newMealBlog,
      });
  } catch (error) {
    console.error("Error creating meal blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

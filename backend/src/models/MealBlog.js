import mongoose from "mongoose";

const mealBlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: "Admin",
  },
  image: {
    type: String,
    required: false, // Optional image URL for the blog post
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("MealBlog", mealBlogSchema);

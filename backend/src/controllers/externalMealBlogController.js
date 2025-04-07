import fetch from "node-fetch"; // We'll use node-fetch to make HTTP requests from the backend

export const getExternalMealBlogs = async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "NewsAPI key is not configured" });
    }

    const query = 'meals OR recipes OR "food blogs" -politics';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "ok" || !data.articles) {
      throw new Error("Failed to fetch articles from NewsAPI");
    }

    // Transform the data to match the frontend's expected format
    const transformedData = data.articles.slice(0, 5).map((article) => ({
      _id: article.url,
      title: article.title || "Untitled",
      content: article.description || "No description available",
      author: article.author || article.source.name || "Unknown Author",
      createdAt: article.publishedAt || new Date().toISOString(),
      image:
        article.urlToImage ||
        "https://via.placeholder.com/300x200?text=No+Image",
    }));

    res.status(200).json(transformedData);
  } catch (error) {
    console.error("Error fetching external meal blogs:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch external meal blogs",
        error: error.message,
      });
  }
};

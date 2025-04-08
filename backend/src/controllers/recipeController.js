import axios from "axios";

// Fetch a list of healthy recipes
export const getHealthyRecipes = async (req, res) => {
  try {
    const { diet, type } = req.query; // Optional filters from the frontend

    // Fetch popular menus (e.g., main course, healthy)
    const popularResponse = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          diet: diet || "",
          type: type || "main course",
          tags: "healthy",
          number: 10, // Fetch 10 recipes for popular menus
          addRecipeNutrition: true, // Include nutritional info
        },
      }
    );

    // Fetch recommended menus (e.g., breakfast, healthy)
    const recommendedResponse = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          diet: diet || "",
          type: "breakfast", // Different type for recommended
          tags: "healthy",
          number: 10, // Fetch 10 recipes for recommended menus
          addRecipeNutrition: true,
        },
      }
    );

    const popularRecipes = popularResponse.data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      calories:
        recipe.nutrition?.nutrients?.find((n) => n.name === "Calories")
          ?.amount || 0,
    }));

    const recommendedRecipes = recommendedResponse.data.results.map(
      (recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        calories:
          recipe.nutrition?.nutrients?.find((n) => n.name === "Calories")
            ?.amount || 0,
      })
    );

    res.status(200).json({ popularRecipes, recommendedRecipes });
  } catch (error) {
    console.error("Error fetching healthy recipes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch detailed information for a specific recipe
export const getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          includeNutrition: true,
        },
      }
    );

    const recipe = response.data;

    const formattedRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      description: recipe.summary
        ? recipe.summary.replace(/<[^>]+>/g, "")
        : "No description available", // Remove HTML tags
      ingredients: recipe.extendedIngredients?.map((ing) => ing.original) || [],
      instructions:
        recipe.analyzedInstructions?.[0]?.steps?.map((step) => step.step) || [],
      optionalToppings:
        recipe.extendedIngredients
          ?.filter((ing) => ing.meta?.includes("optional"))
          ?.map((ing) => ing.original) || [],
      nutrition: {
        calories:
          recipe.nutrition?.nutrients?.find((n) => n.name === "Calories")
            ?.amount || 0,
        protein:
          recipe.nutrition?.nutrients?.find((n) => n.name === "Protein")
            ?.amount || 0,
        carbs:
          recipe.nutrition?.nutrients?.find((n) => n.name === "Carbohydrates")
            ?.amount || 0,
        fats:
          recipe.nutrition?.nutrients?.find((n) => n.name === "Fat")?.amount ||
          0,
      },
    };

    res.status(200).json(formattedRecipe);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

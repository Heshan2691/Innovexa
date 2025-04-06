"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function MealIdeaDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view recipe details");
        }

        const response = await axios.get(
          `http://localhost:5000/api/recipes/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRecipe(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch recipe details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading recipe...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!recipe) return <p style={{ textAlign: "center" }}>Recipe not found</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{recipe.title}</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        {recipe.readyInMinutes} min
      </p>

      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Description</h3>
        <p>{recipe.description}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Ingredients</h3>
        <ul style={{ paddingLeft: "20px" }}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {recipe.optionalToppings.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Optional Toppings
          </h3>
          <ul style={{ paddingLeft: "20px" }}>
            {recipe.optionalToppings.map((topping, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {topping}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Instructions</h3>
        <ol style={{ paddingLeft: "20px" }}>
          {recipe.instructions.map((step, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
          Nutrition (per serving)
        </h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <p>Calories: {recipe.nutrition.calories} kcal</p>
          <p>Protein: {recipe.nutrition.protein}g</p>
          <p>Carbs: {recipe.nutrition.carbs}g</p>
          <p>Fats: {recipe.nutrition.fats}g</p>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Rating</h3>
        <p>⭐⭐⭐⭐⭐ (5.0)</p>
      </div>

      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save to Plan
      </button>
    </div>
  );
}

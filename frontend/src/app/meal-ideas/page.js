"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function MealIdeas() {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view meal ideas");
        }

        const response = await axios.get(
          "http://localhost:5000/api/recipes/healthy",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPopularRecipes(response.data.popularRecipes);
        setRecommendedRecipes(response.data.recommendedRecipes);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch recipes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "10px" }}
      >
        Meal Ideas
      </h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
        Discover healthy recipes to inspire your diet
      </p>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          {error}
        </p>
      )}
      {loading && <p style={{ textAlign: "center" }}>Loading recipes...</p>}

      {/* Popular Menus */}
      <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>Popular Menus</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {popularRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ fontSize: "18px", margin: "0 0 10px 0" }}>
              {recipe.title}
            </h4>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {recipe.calories} kcal
            </p>
            <Link
              href={`/meal-ideas/${recipe.id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Read More
            </Link>
          </div>
        ))}
      </div>

      {/* Recommended Menus */}
      <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
        Recommended Menus
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {recommendedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ fontSize: "18px", margin: "0 0 10px 0" }}>
              {recipe.title}
            </h4>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {recipe.calories} kcal
            </p>
            <Link
              href={`/meal-ideas/${recipe.id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

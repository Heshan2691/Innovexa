"use client";

import { useState } from "react";
import axios from "axios";

export default function DietPlanner() {
  const [date, setDate] = useState("");
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateDietPlan = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to generate a diet plan");
      }
      const response = await axios.post(
        "http://localhost:5000/api/diet-plans/generate",
        { date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDietPlan(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to generate diet plan"
      );
      setDietPlan(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Diet Planner</h2>
      <form onSubmit={handleGenerateDietPlan} style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Select Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#666" : "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Diet Plan"}
        </button>
      </form>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
      {dietPlan && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ textAlign: "center" }}>
            Diet Plan for {new Date(dietPlan.date).toLocaleDateString()}
          </h3>
          <p style={{ textAlign: "center" }}>
            Total Calories: {dietPlan.totalCalories} kcal
          </p>
          <h4 style={{ textAlign: "center" }}>Meals</h4>
          {dietPlan.meals.length === 0 ? (
            <p style={{ textAlign: "center" }}>No meals in this diet plan.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {dietPlan.meals.map((meal) => (
                <li
                  key={meal._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{meal.name}</strong> - {meal.calories} kcal
                  <br />
                  Protein: {meal.protein}g, Carbs: {meal.carbs}g, Fats:{" "}
                  {meal.fats}g
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

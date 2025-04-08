"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MacroCircles from "../../components/MacroCircles";
import api from "../../utils/api";

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [user, setUser] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view your dashboard");
        }

        // Fetch user profile
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;
        const userResponse = await api.get(`/users/${userId}`);
        setUser(userResponse.data);

        // Fetch meals
        const mealsResponse = await axios.get(
          "http://localhost:5000/api/meals",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMeals(mealsResponse.data);

        // Calculate health score
        const totalCalories = mealsResponse.data.reduce(
          (sum, meal) => sum + (meal.calories || 0),
          0
        );
        let targetCalories;
        switch (userResponse.data.healthGoals) {
          case "weight-loss":
            targetCalories = 1500;
            break;
          case "muscle-gain":
            targetCalories = 2500;
            break;
          default:
            targetCalories = 2000;
        }
        // Health score: 100 if total calories are within 10% of target, scales down to 0
        const calorieDiff = Math.abs(totalCalories - targetCalories);
        const maxDiff = targetCalories * 0.1; // 10% of target
        const score = Math.max(0, 100 - (calorieDiff / maxDiff) * 100);
        setHealthScore(Math.round(score));
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalMacros = meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fats: acc.fats + (meal.fats || 0),
    }),
    { protein: 0, carbs: 0, fats: 0 }
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {healthScore !== null && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3>Your Health Score</h3>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor:
                healthScore >= 80
                  ? "#4caf50"
                  : healthScore >= 50
                  ? "#ff9800"
                  : "#f44336",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              color: "#fff",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {healthScore}
          </div>
        </div>
      )}
      <h3 style={{ textAlign: "center" }}>Today’s Macros</h3>
      <MacroCircles
        protein={totalMacros.protein}
        carbs={totalMacros.carbs}
        fats={totalMacros.fats}
      />
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>Logged Meals</h3>
      {meals.length === 0 ? (
        <p style={{ textAlign: "center" }}>No meals logged yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {meals.map((meal) => (
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
              Protein: {meal.protein}g, Carbs: {meal.carbs}g, Fats: {meal.fats}g
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

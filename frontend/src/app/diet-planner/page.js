"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function DietPlanner() {
  const [startDate, setStartDate] = useState("");
  const [diet, setDiet] = useState("");
  const [exclude, setExclude] = useState("");
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFallback, setIsFallback] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);

  // Default placeholder image for meals without an image
  const placeholderImage =
    "https://via.placeholder.com/300x150?text=No+Image+Available";

  // Fetch the latest 3-day plan on mount
  useEffect(() => {
    const fetchLatestPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view your diet plan");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/diet-plans",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.dietPlans && response.data.dietPlans.length > 0) {
          setDietPlans(response.data.dietPlans);
          setCurrentPlanId(response.data.dietPlans[0].planId);
        }
      } catch (err) {
        console.error("Error fetching diet plans:", err);
      }
    };

    fetchLatestPlan();
  }, []);

  const handleGenerateDietPlan = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setIsFallback(false);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to generate a diet plan");
      }
      const response = await axios.post(
        "http://localhost:5000/api/diet-plans/generate",
        { startDate, diet, exclude },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDietPlans(response.data.dietPlans);
      setCurrentPlanId(response.data.dietPlans[0].planId);
      setIsFallback(response.data.isFallback);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to generate diet plan"
      );
      setDietPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateDay = async (planId, dayNumber) => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to regenerate a diet plan");
      }
      const response = await axios.put(
        `http://localhost:5000/api/diet-plans/regenerate/${planId}/${dayNumber}`,
        { diet, exclude },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedPlan = response.data.dietPlan;
      setDietPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === updatedPlan._id ? updatedPlan : plan
        )
      );
      setIsFallback(response.data.isFallback);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to regenerate day"
      );
    } finally {
      setLoading(false);
    }
  };

  // Determine the current day in the 3-day cycle
  const getCurrentDay = () => {
    if (!dietPlans.length) return 1;
    const startDate = new Date(dietPlans[0].date);
    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return (diffDays % 3) + 1; // Cycle through days 1, 2, 3
  };

  const currentDay = getCurrentDay();

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "10px" }}
      >
        My Diet Planner
      </h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
        Your personalized diet plan, powered by AI
      </p>

      {/* Form to generate a new 3-day plan */}
      <form
        onSubmit={handleGenerateDietPlan}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Start Date:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "200px",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Dietary Preference:
            </label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "200px",
              }}
            >
              <option value="">None</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="lowcarb">Low Carb</option>
              <option value="highprotein">High Protein</option>
            </select>
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Exclude Ingredients:
            </label>
            <input
              type="text"
              value={exclude}
              onChange={(e) => setExclude(e.target.value)}
              placeholder="e.g., peanuts, shellfish"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "200px",
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: loading ? "#666" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Generating..." : "Generate 3-Day Plan"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          {error}
        </p>
      )}
      {isFallback && (
        <p
          style={{ color: "orange", textAlign: "center", marginBottom: "20px" }}
        >
          Using local recommendations due to API limitations.
        </p>
      )}

      {/* Display the 3-day plan */}
      {dietPlans.length > 0 && (
        <div>
          {dietPlans.map((plan) => (
            <div key={plan._id} style={{ marginBottom: "40px" }}>
              <h3
                style={{
                  fontSize: "22px",
                  marginBottom: "20px",
                  color: plan.dayNumber === currentDay ? "#007bff" : "#333",
                }}
              >
                Day {plan.dayNumber}{" "}
                {plan.dayNumber === currentDay && "(Today)"}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {plan.meals.map((meal) => (
                  <div
                    key={meal._id}
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "15px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={meal.imageUrl || placeholderImage}
                      alt={meal.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                      onError={(e) => (e.target.src = placeholderImage)} // Fallback if image fails to load
                    />
                    <h4 style={{ fontSize: "18px", margin: "0 0 10px 0" }}>
                      {meal.name}
                    </h4>
                    <p style={{ margin: "5px 0", color: "#666" }}>
                      {meal.calories} kcal | Protein: {meal.protein}g | Carbs:{" "}
                      {meal.carbs}g | Fats: {meal.fats}g
                    </p>
                    <p style={{ margin: "5px 0", color: "#666" }}>
                      Source: {meal.source}
                    </p>
                    {meal.sourceUrl && (
                      <a
                        href={meal.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "10px",
                          color: "#007bff",
                          textDecoration: "none",
                        }}
                      >
                        Read More
                      </a>
                    )}
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <button
                    onClick={() =>
                      handleRegenerateDay(plan.planId, plan.dayNumber)
                    }
                    disabled={loading}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: loading ? "#666" : "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Regenerating..." : "Regenerate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../molecules/sidebar";

// Reusing styles from ViewInsights
const cardStyle = {
  backgroundColor: "white",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  padding: "24px",
  marginBottom: "24px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const cardHeaderStyle = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "16px",
  color: "#111827",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const statCardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const progressBarContainerStyle = {
  width: "100%",
  backgroundColor: "#e5e7eb",
  borderRadius: "8px",
  height: "10px",
  overflow: "hidden",
};

export default function Dashboard() {
  const [healthData, setHealthData] = useState([]);
  const [meals, setMeals] = useState([]);
  const [moodData, setMoodData] = useState([]); // State for mood tracking
  const [userGoal, setUserGoal] = useState(null); // State for user goal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("John");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        // Fetch health data
        const healthResponse = await api.get("/health-data", {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });
        setHealthData(healthResponse.data);

        // Fetch saved meals
        const mealsResponse = await api.get("/users/saved");
        setMeals(mealsResponse.data);

        // Fetch user name
        const userResponse = await api.get("/users/profile");
        setUserName(userResponse.data.name || "John");

        // Fetch mood data (assuming an endpoint exists)
        const moodResponse = await api.get("/users/mood-data", {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });
        setMoodData(moodResponse.data);

        // Fetch user goal (assuming an endpoint exists)
        const goalResponse = await api.get("/users/goal");
        setUserGoal(goalResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sleep Analysis Component
  const SleepAnalysis = () => {
    const past7Days = healthData.filter((data) => {
      const dataDate = new Date(data.date);
      const today = new Date();
      const past7DaysDate = new Date(today);
      past7DaysDate.setDate(today.getDate() - 7);
      return dataDate >= past7DaysDate && dataDate <= today;
    });

    const totalSleep = past7Days.reduce((sum, data) => sum + data.sleepTime, 0);
    const averageSleep =
      past7Days.length > 0 ? (totalSleep / past7Days.length).toFixed(1) : 0;

    return (
      <div
        style={{ ...statCardStyle, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
      >
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌙</div>
        <p
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#8b5cf6",
            marginBottom: "4px",
          }}
        >
          {averageSleep}
        </p>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>Avg. Sleep (hrs)</p>
      </div>
    );
  };

  // Daily Calorie Goal Component
  const DailyCalorieGoal = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMeals = meals.filter((meal) => {
      const mealDate = new Date(meal.date);
      return mealDate.toDateString() === today.toDateString();
    });

    const totalCalories = todayMeals.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );
    const calorieGoal = 2000;
    const progressPercentage = Math.min(
      100,
      (totalCalories / calorieGoal) * 100
    );

    let statusColor = "#10b981";
    if (progressPercentage > 100) statusColor = "#ef4444";
    else if (progressPercentage > 85) statusColor = "#f59e0b";

    return (
      <div style={{ ...statCardStyle, backgroundColor: `${statusColor}10` }}>
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>🎯</div>
        <p
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: statusColor,
            marginBottom: "4px",
          }}
        >
          {totalCalories}
        </p>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          of {calorieGoal} kcal
        </p>
      </div>
    );
  };

  // Water Intake Component
  const WaterIntake = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayHealthData = healthData.find((data) => {
      const dataDate = new Date(data.date);
      return dataDate.toDateString() === today.toDateString();
    });

    const waterConsumed = todayHealthData ? todayHealthData.waterIntake : 0;
    const waterTarget = 2000;
    const progressPercentage = Math.min(
      100,
      (waterConsumed / waterTarget) * 100
    );

    let statusColor = "#3b82f6";
    if (progressPercentage < 50) statusColor = "#ef4444";
    else if (progressPercentage < 75) statusColor = "#f59e0b";

    return (
      <div
        style={{ ...statCardStyle, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
      >
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>💧</div>
        <p
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#3b82f6",
            marginBottom: "4px",
          }}
        >
          {waterConsumed}
        </p>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          of {waterTarget} mL
        </p>
      </div>
    );
  };

  // Nutrition Analysis Component
  const NutritionAnalysis = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMeals = meals.filter((meal) => {
      const mealDate = new Date(meal.date);
      return mealDate.toDateString() === today.toDateString();
    });

    const totalProtein = todayMeals.reduce(
      (sum, meal) => sum + meal.protein,
      0
    );
    const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFats = todayMeals.reduce((sum, meal) => sum + meal.fats, 0);

    return (
      <div
        style={{ ...statCardStyle, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
      >
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>🍽️</div>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>
          Protein: {totalProtein}g | Carbs: {totalCarbs}g | Fats: {totalFats}g
        </p>
      </div>
    );
  };

  // BMI Analysis Component
  const BMIAnalysis = () => {
    const currentBMI = healthData.length > 0 ? healthData[0].bmi : 0;

    let bmiCategory = "";
    let bmiColor = "";
    if (currentBMI < 18.5) {
      bmiCategory = "Underweight";
      bmiColor = "#3b82f6";
    } else if (currentBMI >= 18.5 && currentBMI < 25) {
      bmiCategory = "Normal";
      bmiColor = "#10b981";
    } else if (currentBMI >= 25 && currentBMI < 30) {
      bmiCategory = "Overweight";
      bmiColor = "#f59e0b";
    } else {
      bmiCategory = "Obese";
      bmiColor = "#ef4444";
    }

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>⚖️</span>
          Your BMI
        </h2>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div
            style={{
              ...statCardStyle,
              flex: "0 0 150px",
              backgroundColor: `${bmiColor}10`,
            }}
          >
            <p
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: bmiColor,
                marginBottom: "4px",
              }}
            >
              {currentBMI}
            </p>
            <div
              style={{
                padding: "4px 12px",
                backgroundColor: `${bmiColor}10`,
                color: bmiColor,
                borderRadius: "20px",
                fontWeight: "600",
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              {bmiCategory}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={progressBarContainerStyle}>
              <div
                style={{
                  width: `${(currentBMI / 40) * 100}%`,
                  backgroundColor: bmiColor,
                  height: "100%",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
              Healthy BMI range: 18.5 - 24.9
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Health & Nutrition Tips Component
  const HealthTips = () => {
    const tips = [
      {
        icon: "💧",
        text: "Boost your fiber with a morning oatmeal bowl",
        color: "#3b82f6",
      },
      {
        icon: "🌙",
        text: "Swap sodas with herbal tea to cut sugar",
        color: "#8b5cf6",
      },
      {
        icon: "🥗",
        text: "Add grilled chicken for a protein boost",
        color: "#10b981",
      },
      {
        icon: "🧠",
        text: "Snack smart with nuts instead of chips",
        color: "#f59e0b",
      },
    ];

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>Health & Nutrition Tips</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {tips.map((tip, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: `${tip.color}10`,
                borderLeft: `4px solid ${tip.color}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "24px" }}>{tip.icon}</span>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Daily Activity Snapshot Component
  const DailyActivitySnapshot = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayHealthData = healthData.find((data) => {
      const dataDate = new Date(data.date);
      return dataDate.toDateString() === today.toDateString();
    });

    const steps = todayHealthData ? todayHealthData.steps : 0;
    const caloriesBurned = todayHealthData ? todayHealthData.caloriesBurned : 0;
    const activeMinutes = todayHealthData
      ? todayHealthData.activeMinutes || 0
      : 0; // Assuming activeMinutes is a field

    const stepGoal = 10000;
    const stepProgress = Math.min(100, (steps / stepGoal) * 100);
    let motivationalMessage = "";
    let messageColor = "#10b981"; // Green

    if (steps >= stepGoal) {
      motivationalMessage = "Amazing job! You’ve hit your step goal! 🎉";
    } else if (steps >= stepGoal * 0.5) {
      motivationalMessage =
        "Great progress! You’re halfway to your step goal! 🚀";
      messageColor = "#f59e0b"; // Amber
    } else {
      motivationalMessage = "Keep moving! You can reach your step goal! 💪";
      messageColor = "#ef4444"; // Red
    }

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>🏃‍♂️</span>
          Daily Activity Snapshot
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              ...statCardStyle,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>👟</div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#10b981",
                marginBottom: "4px",
              }}
            >
              {steps}
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>Steps</p>
          </div>
          <div
            style={{
              ...statCardStyle,
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔥</div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#ef4444",
                marginBottom: "4px",
              }}
            >
              {caloriesBurned}
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Calories Burned
            </p>
          </div>
          <div
            style={{
              ...statCardStyle,
              backgroundColor: "rgba(59, 130, 246, 0.1)",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⏱️</div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#3b82f6",
                marginBottom: "4px",
              }}
            >
              {activeMinutes}
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>Active Minutes</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={progressBarContainerStyle}>
            <div
              style={{
                width: `${stepProgress}%`,
                backgroundColor: "#10b981",
                height: "100%",
                borderRadius: "8px",
              }}
            ></div>
          </div>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            {stepProgress.toFixed(0)}% of your daily step goal ({stepGoal}{" "}
            steps)
          </p>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              borderLeft: `4px solid ${messageColor}`,
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: messageColor,
                fontWeight: "500",
              }}
            >
              {motivationalMessage}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Mood Tracker Component
  const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState("");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMood = moodData.find((data) => {
      const dataDate = new Date(data.date);
      return dataDate.toDateString() === today.toDateString();
    });

    const past7Days = moodData.filter((data) => {
      const dataDate = new Date(data.date);
      const past7DaysDate = new Date(today);
      past7DaysDate.setDate(today.getDate() - 7);
      return dataDate >= past7DaysDate && dataDate <= today;
    });

    const moodOptions = [
      { label: "Happy", emoji: "😊", color: "#10b981" },
      { label: "Stressed", emoji: "😓", color: "#f59e0b" },
      { label: "Tired", emoji: "😴", color: "#3b82f6" },
      { label: "Sad", emoji: "😢", color: "#ef4444" },
    ];

    const handleMoodSubmit = async () => {
      if (!selectedMood) return;
      try {
        await api.post("/mood-data", {
          mood: selectedMood,
          date: today.toISOString(),
        });
        setMoodData([...moodData, { mood: selectedMood, date: today }]);
        setSelectedMood("");
      } catch (err) {
        setError("Failed to log mood");
      }
    };

    const getMoodTrend = () => {
      const moodCounts = past7Days.reduce((acc, data) => {
        acc[data.mood] = (acc[data.mood] || 0) + 1;
        return acc;
      }, {});
      const mostFrequentMood = Object.keys(moodCounts).reduce(
        (a, b) => (moodCounts[a] > moodCounts[b] ? a : b),
        "Happy"
      );
      return `You’ve been feeling mostly ${mostFrequentMood.toLowerCase()} this week.`;
    };

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>🧠</span>
          Mood Tracker
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Log Today's Mood */}
          <div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              How are you feeling today?
            </p>
            {todayMood ? (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f0f9ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "24px" }}>
                  {moodOptions.find((m) => m.label === todayMood.mood)?.emoji}
                </span>
                <p style={{ fontSize: "14px", color: "#1e40af" }}>
                  You logged: <strong>{todayMood.mood}</strong>
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                {moodOptions.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: `2px solid ${mood.color}`,
                      backgroundColor:
                        selectedMood === mood.label
                          ? `${mood.color}20`
                          : "transparent",
                      color: mood.color,
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{mood.emoji}</span>
                    {mood.label}
                  </button>
                ))}
              </div>
            )}
            {!todayMood && selectedMood && (
              <button
                onClick={handleMoodSubmit}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Log Mood
              </button>
            )}
          </div>

          {/* Weekly Mood Trend */}
          {past7Days.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "12px",
                }}
              >
                Your Mood This Week
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {past7Days.map((data, index) => {
                  const moodOption = moodOptions.find(
                    (m) => m.label === data.mood
                  );
                  return (
                    <div
                      key={index}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: moodOption
                          ? `${moodOption.color}20`
                          : "#e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                      }}
                      title={`${new Date(data.date).toLocaleDateString(
                        "en-US",
                        { weekday: "short" }
                      )}: ${data.mood}`}
                    >
                      {moodOption?.emoji || "❓"}
                    </div>
                  );
                })}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  marginTop: "12px",
                }}
              >
                {getMoodTrend()}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Personalized Goal Progress Component
  const PersonalizedGoalProgress = () => {
    if (!userGoal) {
      return (
        <div style={cardStyle}>
          <h2 style={cardHeaderStyle}>
            <span style={{ fontSize: "24px" }}>🎯</span>
            Personalized Goal Progress
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Set a goal to track your progress! Go to your profile to add a goal.
          </p>
        </div>
      );
    }

    const { type, target, current, unit, startDate, endDate } = userGoal;
    const progressPercentage = Math.min(100, (current / target) * 100);
    const daysLeft = Math.max(
      0,
      Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24))
    );
    const milestone = target * 0.5; // 50% milestone
    const hasReachedMilestone = current >= milestone && current < target;

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>🎯</span>
          Personalized Goal Progress
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Goal: {type} - Reach {target} {unit} by{" "}
              {new Date(endDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <div style={progressBarContainerStyle}>
              <div
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: "#10b981",
                  height: "100%",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
              Current: {current} {unit} ({progressPercentage.toFixed(0)}% of
              your goal)
            </p>
          </div>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              borderLeft: "4px solid #10b981",
            }}
          >
            <p
              style={{ fontSize: "14px", color: "#111827", fontWeight: "500" }}
            >
              {progressPercentage === 100
                ? "Congratulations! You’ve reached your goal! 🎉"
                : hasReachedMilestone
                ? "Great job! You’ve passed the halfway mark! 🚀"
                : `Keep going! You have ${daysLeft} days left to reach your goal.`}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
      <Sidebar />
      <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ padding: "32px", flex: "1" }}>
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Good Morning, {userName}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "16px" }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: "16px 20px",
                marginBottom: "28px",
                backgroundColor: "#fee2e2",
                borderLeft: "5px solid #ef4444",
                color: "#b91c1c",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "15px",
              }}
            >
              <span style={{ fontSize: "20px" }}>⚠️</span>
              {error}
            </div>
          )}
          {loading && (
            <div
              style={{
                padding: "16px 20px",
                marginBottom: "28px",
                backgroundColor: "#dbeafe",
                borderLeft: "5px solid #3b82f6",
                color: "#1e40af",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "15px",
              }}
            >
              <span style={{ fontSize: "20px" }}>⏳</span>
              Loading dashboard...
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <SleepAnalysis />
            <DailyCalorieGoal />
            <WaterIntake />
            <NutritionAnalysis />
          </div>

          <BMIAnalysis />
          <HealthTips />
          <DailyActivitySnapshot />
          <MoodTracker />
          <PersonalizedGoalProgress />
        </div>
      </div>
    </div>
  );
}

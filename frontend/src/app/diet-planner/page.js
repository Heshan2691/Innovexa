// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function DietPlanner() {
//   const [startDate, setStartDate] = useState("");
//   const [diet, setDiet] = useState("");
//   const [exclude, setExclude] = useState("");
//   const [dietPlans, setDietPlans] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isFallback, setIsFallback] = useState(false);
//   const [currentPlanId, setCurrentPlanId] = useState(null);

//   // Default placeholder image for meals without an image
//   const placeholderImage =
//     "https://via.placeholder.com/300x150?text=No+Image+Available";

//   // Fetch the latest 3-day plan on mount
//   useEffect(() => {
//     const fetchLatestPlan = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Please log in to view your diet plan");
//           return;
//         }

//         const response = await axios.get(
//           "http://localhost:5000/api/diet-plans",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (response.data.dietPlans && response.data.dietPlans.length > 0) {
//           setDietPlans(response.data.dietPlans);
//           setCurrentPlanId(response.data.dietPlans[0].planId);
//         }
//       } catch (err) {
//         console.error("Error fetching diet plans:", err);
//       }
//     };

//     fetchLatestPlan();
//   }, []);

//   const handleGenerateDietPlan = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError("");
//       setIsFallback(false);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Please log in to generate a diet plan");
//       }
//       const response = await axios.post(
//         "http://localhost:5000/api/diet-plans/generate",
//         { startDate, diet, exclude },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setDietPlans(response.data.dietPlans);
//       setCurrentPlanId(response.data.dietPlans[0].planId);
//       setIsFallback(response.data.isFallback);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to generate diet plan"
//       );
//       setDietPlans([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegenerateDay = async (planId, dayNumber) => {
//     try {
//       setLoading(true);
//       setError("");
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Please log in to regenerate a diet plan");
//       }
//       const response = await axios.put(
//         `http://localhost:5000/api/diet-plans/regenerate/${planId}/${dayNumber}`,
//         { diet, exclude },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const updatedPlan = response.data.dietPlan;
//       setDietPlans((prevPlans) =>
//         prevPlans.map((plan) =>
//           plan._id === updatedPlan._id ? updatedPlan : plan
//         )
//       );
//       setIsFallback(response.data.isFallback);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Failed to regenerate day"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Determine the current day in the 3-day cycle
//   const getCurrentDay = () => {
//     if (!dietPlans.length) return 1;
//     const startDate = new Date(dietPlans[0].date);
//     const today = new Date();
//     const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
//     return (diffDays % 3) + 1; // Cycle through days 1, 2, 3
//   };

//   const currentDay = getCurrentDay();

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
//       <h2
//         style={{ textAlign: "center", fontSize: "28px", marginBottom: "10px" }}
//       >
//         My Diet Planner
//       </h2>
//       <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
//         Your personalized diet plan, powered by AI
//       </p>

//       {/* Form to generate a new 3-day plan */}
//       <form
//         onSubmit={handleGenerateDietPlan}
//         style={{ textAlign: "center", marginBottom: "40px" }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             flexWrap: "wrap",
//           }}
//         >
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//               }}
//             >
//               Start Date:
//             </label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               required
//               style={{
//                 padding: "8px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 width: "200px",
//               }}
//             />
//           </div>
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//               }}
//             >
//               Dietary Preference:
//             </label>
//             <select
//               value={diet}
//               onChange={(e) => setDiet(e.target.value)}
//               style={{
//                 padding: "8px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 width: "200px",
//               }}
//             >
//               <option value="">None</option>
//               <option value="vegan">Vegan</option>
//               <option value="vegetarian">Vegetarian</option>
//               <option value="gluten free">Gluten Free</option>
//               <option value="ketogenic">Ketogenic</option>
//               <option value="lowcarb">Low Carb</option>
//               <option value="highprotein">High Protein</option>
//             </select>
//           </div>
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//               }}
//             >
//               Exclude Ingredients:
//             </label>
//             <input
//               type="text"
//               value={exclude}
//               onChange={(e) => setExclude(e.target.value)}
//               placeholder="e.g., peanuts, shellfish"
//               style={{
//                 padding: "8px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 width: "200px",
//               }}
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             backgroundColor: loading ? "#666" : "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: "16px",
//           }}
//         >
//           {loading ? "Generating..." : "Generate 3-Day Plan"}
//         </button>
//       </form>

//       {error && (
//         <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
//           {error}
//         </p>
//       )}
//       {isFallback && (
//         <p
//           style={{ color: "orange", textAlign: "center", marginBottom: "20px" }}
//         >
//           Using local recommendations due to API limitations.
//         </p>
//       )}

//       {/* Display the 3-day plan */}
//       {dietPlans.length > 0 && (
//         <div>
//           {dietPlans.map((plan) => (
//             <div key={plan._id} style={{ marginBottom: "40px" }}>
//               <h3
//                 style={{
//                   fontSize: "22px",
//                   marginBottom: "20px",
//                   color: plan.dayNumber === currentDay ? "#007bff" : "#333",
//                 }}
//               >
//                 Day {plan.dayNumber}{" "}
//                 {plan.dayNumber === currentDay && "(Today)"}
//               </h3>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//                   gap: "20px",
//                 }}
//               >
//                 {plan.meals.map((meal) => (
//                   <div
//                     key={meal._id}
//                     style={{
//                       border: "1px solid #e0e0e0",
//                       borderRadius: "8px",
//                       padding: "15px",
//                       backgroundColor: "#fff",
//                       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                     }}
//                   >
//                     <img
//                       src={meal.imageUrl || placeholderImage}
//                       alt={meal.name}
//                       style={{
//                         width: "100%",
//                         height: "150px",
//                         objectFit: "cover",
//                         borderRadius: "4px",
//                         marginBottom: "10px",
//                       }}
//                       onError={(e) => (e.target.src = placeholderImage)} // Fallback if image fails to load
//                     />
//                     <h4 style={{ fontSize: "18px", margin: "0 0 10px 0" }}>
//                       {meal.name}
//                     </h4>
//                     <p style={{ margin: "5px 0", color: "#666" }}>
//                       {meal.calories} kcal | Protein: {meal.protein}g | Carbs:{" "}
//                       {meal.carbs}g | Fats: {meal.fats}g
//                     </p>
//                     <p style={{ margin: "5px 0", color: "#666" }}>
//                       Source: {meal.source}
//                     </p>
//                     {meal.sourceUrl && (
//                       <a
//                         href={meal.sourceUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{
//                           display: "inline-block",
//                           marginTop: "10px",
//                           color: "#007bff",
//                           textDecoration: "none",
//                         }}
//                       >
//                         Read More
//                       </a>
//                     )}
//                   </div>
//                 ))}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     border: "1px solid #e0e0e0",
//                     borderRadius: "8px",
//                     backgroundColor: "#fff",
//                     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   <button
//                     onClick={() =>
//                       handleRegenerateDay(plan.planId, plan.dayNumber)
//                     }
//                     disabled={loading}
//                     style={{
//                       padding: "10px 20px",
//                       backgroundColor: loading ? "#666" : "#28a745",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: loading ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     {loading ? "Regenerating..." : "Regenerate"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../atoms/Button"; // Assuming this is your Button atom
import MealIdeasCard from "../../molecules/MealIdeasCard"; // Assuming this is your MealIdeasCard molecule
import Sidebar from "../../molecules/sidebar"; // Assuming this is your Sidebar molecule
import Link from "next/link"; // Assuming you're using Next.js for routing
import Navbar from "../../components/Navbar"; // Assuming this is your Navbar component
export default function DietPlanner() {
  const [startDate, setStartDate] = useState("");
  const [diet, setDiet] = useState("");
  const [exclude, setExclude] = useState("");
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFallback, setIsFallback] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);

  const placeholderImage =
    "https://via.placeholder.com/300x150?text=No+Image+Available";

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

  const getCurrentDay = () => {
    if (!dietPlans.length) return 1;
    const startDate = new Date(dietPlans[0].date);
    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return (diffDays % 3) + 1;
  };

  const currentDay = getCurrentDay();

  // Modern input field styles
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "none",
    borderBottom: "2px solid #e0e0e0",
    borderRadius: "0",
    fontSize: "16px",
    backgroundColor: "transparent",
    transition: "border-bottom-color 0.3s ease",
    outline: "none",
  };

  const inputFocusStyle = {
    borderBottomColor: "#007bff",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    background:
      "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE2IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDggOC41TDE1IDEuNSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=') no-repeat right 16px center",
  };

  // Override styles for the Button component to match the design in the image
  const buttonOverrideStyle = {
    width: "auto", // Override the fixed width from the Button component
    height: "auto", // Override the fixed height
    padding: "12px 24px", // Match the padding used in the design
    fontSize: "16px", // Consistent font size
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px" }}>
        <Navbar />
        <h2 style={{ fontSize: "28px", marginBottom: "12px", color: "#333" }}>
          My Diet Planner
        </h2>
        <p style={{ color: "#666", marginBottom: "40px", fontSize: "16px" }}>
          Your personalized diet plan, powered by AI.
        </p>

        {/* Form */}
        <form
          onSubmit={handleGenerateDietPlan}
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor =
                    inputFocusStyle.borderBottomColor)
                }
                onBlur={(e) => (e.target.style.borderBottomColor = "#e0e0e0")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                Dietary Preference
              </label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                style={selectStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor =
                    inputFocusStyle.borderBottomColor)
                }
                onBlur={(e) => (e.target.style.borderBottomColor = "#e0e0e0")}
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
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                Exclude Ingredients
              </label>
              <input
                type="text"
                value={exclude}
                onChange={(e) => setExclude(e.target.value)}
                placeholder="e.g., peanuts, shellfish"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor =
                    inputFocusStyle.borderBottomColor)
                }
                onBlur={(e) => (e.target.style.borderBottomColor = "#e0e0e0")}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "flex-end",
            }}
          >
            {/* Why Diet Plan Button */}
            <Link href="/why_diet_planner" passHref legacyBehavior>
              <Button
                variant="primary"
                style={{
                  ...buttonOverrideStyle,
                  width: "100%", // Make the button full-width in the sidebar
                }}
              >
                Why Diet Plan
              </Button>
            </Link>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              style={{
                ...buttonOverrideStyle,
                backgroundColor: loading ? "#666" : undefined,
                cursor: loading ? "not-allowed" : undefined,
              }}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </form>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "16px",
            }}
          >
            {error}
          </p>
        )}
        {isFallback && (
          <p
            style={{
              color: "orange",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "16px",
            }}
          >
            Using local recommendations due to API limitations.
          </p>
        )}

        {/* Diet Plan Display */}
        {dietPlans.length > 0 && (
          <div>
            {dietPlans.map((plan) => (
              <div key={plan._id} style={{ marginBottom: "50px" }}>
                <h3
                  style={{
                    fontSize: "22px",
                    marginBottom: "25px",
                    color: plan.dayNumber === currentDay ? "#007bff" : "#333",
                    fontWeight: "600",
                  }}
                >
                  Day {plan.dayNumber}{" "}
                  {plan.dayNumber === currentDay && "(Today)"}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "25px",
                  }}
                >
                  {plan.meals.map((meal) => (
                    <MealIdeasCard
                      key={meal._id}
                      image={meal.imageUrl || placeholderImage}
                      title={meal.name}
                      description={`${meal.calories} kcal | Protein: ${meal.protein}g | Carbs: ${meal.carbs}g | Fats: ${meal.fats}g`}
                      source={meal.source}
                      sourceUrl={meal.sourceUrl}
                    />
                  ))}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #e0e0e0",
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      padding: "20px",
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleRegenerateDay(plan.planId, plan.dayNumber)
                      }
                      disabled={loading}
                      style={{
                        ...buttonOverrideStyle,
                        backgroundColor: loading ? "#666" : undefined,
                        cursor: loading ? "not-allowed" : undefined,
                      }}
                    >
                      {loading ? "Regenerating..." : "Regenerate"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button
                variant="primary"
                onClick={() => {}}
                style={buttonOverrideStyle}
              >
                Add to My Diet Plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../molecules/sidebar";

export default function AddData() {
  const [healthForm, setHealthForm] = useState({
    weight: "",
    height: "",
    waterIntake: "",
    sleepTime: "",
    steps: "",
    caloriesBurned: "",
  });
  const [bmi, setBmi] = useState(null);
  const [savedMeals, setSavedMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch saved meals on component mount
  useEffect(() => {
    const fetchSavedMeals = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/meals/saved");
        setSavedMeals(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch saved meals");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedMeals();
  }, []);

  // Handle health form input changes
  const handleHealthFormChange = (e) => {
    const { name, value } = e.target;
    setHealthForm((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate BMI when weight or height changes
  useEffect(() => {
    const { weight, height } = healthForm;
    if (weight && height) {
      const heightInMeters = parseFloat(height) / 100; // Convert height from cm to meters
      const calculatedBmi = (
        parseFloat(weight) /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      setBmi(calculatedBmi);
    } else {
      setBmi(null);
    }
  }, [healthForm.weight, healthForm.height]);

  // Handle health form submission
  const handleHealthFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!bmi) {
      setError("Please enter weight and height to calculate BMI");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/health-data", {
        bmi: parseFloat(bmi),
        waterIntake: parseInt(healthForm.waterIntake),
        sleepTime: parseFloat(healthForm.sleepTime),
        steps: parseInt(healthForm.steps),
        caloriesBurned: parseInt(healthForm.caloriesBurned),
        weight: parseFloat(healthForm.weight),
      });

      setSuccess("Health data added successfully!");
      // Reset form
      setHealthForm({
        weight: "",
        height: "",
        waterIntake: "",
        sleepTime: "",
        steps: "",
        caloriesBurned: "",
      });
      setBmi(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add health data");
    } finally {
      setLoading(false);
    }
  };

  // Handle meal selection
  const handleMealSelection = (mealId) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  // Handle logging selected meals
  // Inside the AddData component
  const handleLogMeals = async () => {
    setError("");
    setSuccess("");

    if (selectedMeals.length === 0) {
      setError("Please select at least one meal to log");
      return;
    }

    try {
      setLoading(true);
      await api.post("/meal-logs", { mealIds: selectedMeals });
      setSuccess("Meals logged successfully!");
      setSelectedMeals([]); // Reset selection
    } catch (err) {
      setError(err.response?.data?.message || "Failed to log meals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Navbar />
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
            Good Morning, John
          </h1>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {error && (
            <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", marginBottom: "20px" }}>{success}</p>
          )}
          {loading && <p>Loading...</p>}

          {/* BMI Calculation Section */}
          <div style={{ marginBottom: "20px" }}>
            <h2>Find My BMI</h2>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={healthForm.weight}
                  onChange={handleHealthFormChange}
                  placeholder="65"
                  style={{ padding: "5px", width: "100px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={healthForm.height}
                  onChange={handleHealthFormChange}
                  placeholder="170"
                  style={{ padding: "5px", width: "100px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Age
                </label>
                <input
                  type="number"
                  value="26"
                  disabled
                  style={{
                    padding: "5px",
                    width: "100px",
                    backgroundColor: "#e0e0e0",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                {bmi && (
                  <>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {bmi}
                    </p>
                    <p>BMI</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Health Data Input Section */}
          <div style={{ marginBottom: "20px" }}>
            <h2>Log My Health Data</h2>
            <form
              onSubmit={handleHealthFormSubmit}
              style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Water Intake (mL)
                </label>
                <input
                  type="number"
                  name="waterIntake"
                  value={healthForm.waterIntake}
                  onChange={handleHealthFormChange}
                  placeholder="2000"
                  style={{ padding: "5px", width: "100px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Sleep Time (hours)
                </label>
                <input
                  type="number"
                  name="sleepTime"
                  value={healthForm.sleepTime}
                  onChange={handleHealthFormChange}
                  placeholder="7.5"
                  step="0.1"
                  style={{ padding: "5px", width: "100px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Steps Count
                </label>
                <input
                  type="number"
                  name="steps"
                  value={healthForm.steps}
                  onChange={handleHealthFormChange}
                  placeholder="8000"
                  style={{ padding: "5px", width: "100px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Burnt Calories (kcal)
                </label>
                <input
                  type="number"
                  name="caloriesBurned"
                  value={healthForm.caloriesBurned}
                  onChange={handleHealthFormChange}
                  placeholder="500"
                  style={{ padding: "5px", width: "100px" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Save Health Data
              </button>
            </form>
          </div>

          {/* Meal Logging Section */}
          <div style={{ marginBottom: "20px" }}>
            <h2>What Did You Eat?</h2>
            {savedMeals.length > 0 ? (
              <>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "20px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f0f0f0" }}>
                      <th style={{ padding: "10px", textAlign: "left" }}></th>
                      <th style={{ padding: "10px", textAlign: "left" }}>
                        Meal
                      </th>
                      <th style={{ padding: "10px", textAlign: "left" }}>
                        Calories (kcal)
                      </th>
                      <th style={{ padding: "10px", textAlign: "left" }}>
                        Protein (g)
                      </th>
                      <th style={{ padding: "10px", textAlign: "left" }}>
                        Carbs (g)
                      </th>
                      <th style={{ padding: "10px", textAlign: "left" }}>
                        Fats (g)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedMeals.map((meal) => (
                      <tr
                        key={meal._id}
                        style={{ borderBottom: "1px solid #e0e0e0" }}
                      >
                        <td style={{ padding: "10px" }}>
                          <input
                            type="checkbox"
                            checked={selectedMeals.includes(meal._id)}
                            onChange={() => handleMealSelection(meal._id)}
                          />
                        </td>
                        <td style={{ padding: "10px" }}>{meal.name}</td>
                        <td style={{ padding: "10px" }}>{meal.calories}</td>
                        <td style={{ padding: "10px" }}>{meal.protein}</td>
                        <td style={{ padding: "10px" }}>{meal.carbs}</td>
                        <td style={{ padding: "10px" }}>{meal.fats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={handleLogMeals}
                  disabled={loading}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Log Selected Meals
                </button>
              </>
            ) : (
              <p>
                No saved meals available. Add meals via the Meal Ideas page.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// pages/AddData.tsx
// "use client";

// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import api from "../../utils/api";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../molecules/sidebar";
// import BMICalculator from "../../molecules/bmi_cal"; // Import the BMI Calculator
// import HealthMetricCard from "../../molecules/HealthMetricCard"; // Import the new card component
// import { colors } from "../../styles/colors";
// import { fonts } from "../../styles/fonts";

// // Styled components for layout
// const PageContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   background-color: #f5f5f5;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   padding: 20px;
// `;

// const ContentWrapper = styled.div`
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const Header = styled.h1`
//   font-family: ${fonts.poppins.family};
//   font-size: 24px;
//   margin-bottom: 10px;
//   color: ${colors.deepSlate};
// `;

// const DateText = styled.p`
//   color: #666;
//   margin-bottom: 20px;
//   font-family: ${fonts.poppins.family};
//   font-size: 14px;
// `;

// const HealthSection = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 40px;
// `;

// const LeftSection = styled.div`
//   flex: 1;
// `;

// const RightSection = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 20px;
//   width: 340px; /* Adjust based on card size */
// `;

// const PlaceholderSection = styled.div`
//   margin-top: 40px;
// `;

// const PlaceholderTitle = styled.h2`
//   font-family: ${fonts.poppins.family};
//   font-size: 18px;
//   color: ${colors.deepSlate};
//   margin-bottom: 20px;
// `;

// export default function AddData() {
//   const [healthForm, setHealthForm] = useState({
//     weight: "",
//     height: "",
//     waterIntake: "",
//     sleepTime: "",
//     steps: "",
//     caloriesBurned: "",
//   });
//   const [bmi, setBmi] = useState(null);
//   const [savedMeals, setSavedMeals] = useState([]);
//   const [selectedMeals, setSelectedMeals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Fetch saved meals on component mount
//   useEffect(() => {
//     const fetchSavedMeals = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const response = await api.get("/meals/saved");
//         setSavedMeals(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch saved meals");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedMeals();
//   }, []);

//   // Handle health form input changes
//   const handleHealthFormChange = (e) => {
//     const { name, value } = e.target;
//     setHealthForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Calculate BMI when weight or height changes
//   useEffect(() => {
//     const { weight, height } = healthForm;
//     if (weight && height) {
//       const heightInMeters = parseFloat(height) / 100; // Convert height from cm to meters
//       const calculatedBmi = (
//         parseFloat(weight) /
//         (heightInMeters * heightInMeters)
//       ).toFixed(1);
//       setBmi(calculatedBmi);
//     } else {
//       setBmi(null);
//     }
//   }, [healthForm.weight, healthForm.height]);

//   // Handle health form submission
//   const handleHealthFormSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!bmi) {
//       setError("Please enter weight and height to calculate BMI");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await api.post("/health-data", {
//         bmi: parseFloat(bmi),
//         waterIntake: parseInt(healthForm.waterIntake),
//         sleepTime: parseFloat(healthForm.sleepTime),
//         steps: parseInt(healthForm.steps),
//         caloriesBurned: parseInt(healthForm.caloriesBurned),
//         weight: parseFloat(healthForm.weight),
//       });

//       setSuccess("Health data added successfully!");
//       // Reset form
//       setHealthForm({
//         weight: "",
//         height: "",
//         waterIntake: "",
//         sleepTime: "",
//         steps: "",
//         caloriesBurned: "",
//       });
//       setBmi(null);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to add health data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle meal selection
//   const handleMealSelection = (mealId) => {
//     setSelectedMeals((prev) =>
//       prev.includes(mealId)
//         ? prev.filter((id) => id !== mealId)
//         : [...prev, mealId]
//     );
//   };

//   // Handle logging selected meals
//   const handleLogMeals = async () => {
//     setError("");
//     setSuccess("");

//     if (selectedMeals.length === 0) {
//       setError("Please select at least one meal to log");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/meal-logs", { mealIds: selectedMeals });
//       setSuccess("Meals logged successfully!");
//       setSelectedMeals([]); // Reset selection
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to log meals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <PageContainer>
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <MainContent>
//         <Navbar />
//         <ContentWrapper>
//           <Header>Good Morning, John</Header>
//           <DateText>
//             {new Date().toLocaleDateString("en-US", {
//               weekday: "long",
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             })}
//           </DateText>

//           {error && (
//             <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
//           )}
//           {success && (
//             <p style={{ color: "green", marginBottom: "20px" }}>{success}</p>
//           )}
//           {loading && <p>Loading...</p>}

//           {/* Health Data Section */}
//           <HealthSection>
//             {/* Left: BMI Calculator */}
//             <LeftSection>
//               <BMICalculator />
//             </LeftSection>

//             {/* Right: Health Metrics */}
//             <RightSection>
//               <HealthMetricCard
//                 icon="💧"
//                 label="Daily Water Intake"
//                 name="waterIntake"
//                 value={healthForm.waterIntake}
//                 onChange={handleHealthFormChange}
//                 placeholder="2000"
//               />
//               <HealthMetricCard
//                 icon="💤"
//                 label="Sleeping Time"
//                 name="sleepTime"
//                 value={healthForm.sleepTime}
//                 onChange={handleHealthFormChange}
//                 placeholder="7.5"
//               />
//               <HealthMetricCard
//                 icon="👟"
//                 label="Steps Count"
//                 name="steps"
//                 value={healthForm.steps}
//                 onChange={handleHealthFormChange}
//                 placeholder="8000"
//               />
//               <HealthMetricCard
//                 icon="🔥"
//                 label="Burnt Calories"
//                 name="caloriesBurned"
//                 value={healthForm.caloriesBurned}
//                 onChange={handleHealthFormChange}
//                 placeholder="500"
//               />
//             </RightSection>
//           </HealthSection>

//           {/* Placeholder for "What Did You Eat?" Section */}
//           <PlaceholderSection>
//             <PlaceholderTitle>What Did You Eat?</PlaceholderTitle>
//             <p>Meal logging section to be implemented later.</p>
//           </PlaceholderSection>
//         </ContentWrapper>
//       </MainContent>
//     </PageContainer>
//   );
// }

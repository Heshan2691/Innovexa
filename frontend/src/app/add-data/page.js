// "use client";

// import { useState, useEffect } from "react";
// import api from "../../utils/api";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../molecules/sidebar";

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
//   // Inside the AddData component
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
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         backgroundColor: "#f5f5f5",
//       }}
//     >
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div style={{ flex: 1, padding: "20px" }}>
//         <Navbar />
//         <div
//           style={{
//             padding: "20px",
//             backgroundColor: "#fff",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
//             Good Morning, John
//           </h1>
//           <p style={{ color: "#666", marginBottom: "20px" }}>
//             {new Date().toLocaleDateString("en-US", {
//               weekday: "long",
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             })}
//           </p>

//           {error && (
//             <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
//           )}
//           {success && (
//             <p style={{ color: "green", marginBottom: "20px" }}>{success}</p>
//           )}
//           {loading && <p>Loading...</p>}

//           {/* BMI Calculation Section */}
//           <div style={{ marginBottom: "20px" }}>
//             <h2>Find My BMI</h2>
//             <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Weight (kg)
//                 </label>
//                 <input
//                   type="number"
//                   name="weight"
//                   value={healthForm.weight}
//                   onChange={handleHealthFormChange}
//                   placeholder="65"
//                   style={{ padding: "5px", width: "100px" }}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Height (cm)
//                 </label>
//                 <input
//                   type="number"
//                   name="height"
//                   value={healthForm.height}
//                   onChange={handleHealthFormChange}
//                   placeholder="170"
//                   style={{ padding: "5px", width: "100px" }}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Age
//                 </label>
//                 <input
//                   type="number"
//                   value="26"
//                   disabled
//                   style={{
//                     padding: "5px",
//                     width: "100px",
//                     backgroundColor: "#e0e0e0",
//                   }}
//                 />
//               </div>
//               <div style={{ textAlign: "center" }}>
//                 {bmi && (
//                   <>
//                     <p style={{ fontSize: "24px", fontWeight: "bold" }}>
//                       {bmi}
//                     </p>
//                     <p>BMI</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Health Data Input Section */}
//           <div style={{ marginBottom: "20px" }}>
//             <h2>Log My Health Data</h2>
//             <form
//               onSubmit={handleHealthFormSubmit}
//               style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
//             >
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Water Intake (mL)
//                 </label>
//                 <input
//                   type="number"
//                   name="waterIntake"
//                   value={healthForm.waterIntake}
//                   onChange={handleHealthFormChange}
//                   placeholder="2000"
//                   style={{ padding: "5px", width: "100px" }}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Sleep Time (hours)
//                 </label>
//                 <input
//                   type="number"
//                   name="sleepTime"
//                   value={healthForm.sleepTime}
//                   onChange={handleHealthFormChange}
//                   placeholder="7.5"
//                   step="0.1"
//                   style={{ padding: "5px", width: "100px" }}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Steps Count
//                 </label>
//                 <input
//                   type="number"
//                   name="steps"
//                   value={healthForm.steps}
//                   onChange={handleHealthFormChange}
//                   placeholder="8000"
//                   style={{ padding: "5px", width: "100px" }}
//                 />
//               </div>
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Burnt Calories (kcal)
//                 </label>
//                 <input
//                   type="number"
//                   name="caloriesBurned"
//                   value={healthForm.caloriesBurned}
//                   onChange={handleHealthFormChange}
//                   placeholder="500"
//                   style={{ padding: "5px", width: "100px" }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#007bff",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   marginTop: "20px",
//                 }}
//               >
//                 Save Health Data
//               </button>
//             </form>
//           </div>

//           {/* Meal Logging Section */}
//           <div style={{ marginBottom: "20px" }}>
//             <h2>What Did You Eat?</h2>
//             {savedMeals.length > 0 ? (
//               <>
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <thead>
//                     <tr style={{ backgroundColor: "#f0f0f0" }}>
//                       <th style={{ padding: "10px", textAlign: "left" }}></th>
//                       <th style={{ padding: "10px", textAlign: "left" }}>
//                         Meal
//                       </th>
//                       <th style={{ padding: "10px", textAlign: "left" }}>
//                         Calories (kcal)
//                       </th>
//                       <th style={{ padding: "10px", textAlign: "left" }}>
//                         Protein (g)
//                       </th>
//                       <th style={{ padding: "10px", textAlign: "left" }}>
//                         Carbs (g)
//                       </th>
//                       <th style={{ padding: "10px", textAlign: "left" }}>
//                         Fats (g)
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {savedMeals.map((meal) => (
//                       <tr
//                         key={meal._id}
//                         style={{ borderBottom: "1px solid #e0e0e0" }}
//                       >
//                         <td style={{ padding: "10px" }}>
//                           <input
//                             type="checkbox"
//                             checked={selectedMeals.includes(meal._id)}
//                             onChange={() => handleMealSelection(meal._id)}
//                           />
//                         </td>
//                         <td style={{ padding: "10px" }}>{meal.name}</td>
//                         <td style={{ padding: "10px" }}>{meal.calories}</td>
//                         <td style={{ padding: "10px" }}>{meal.protein}</td>
//                         <td style={{ padding: "10px" }}>{meal.carbs}</td>
//                         <td style={{ padding: "10px" }}>{meal.fats}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <button
//                   onClick={handleLogMeals}
//                   disabled={loading}
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Log Selected Meals
//                 </button>
//               </>
//             ) : (
//               <p>
//                 No saved meals available. Add meals via the Meal Ideas page.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const [userName, setUserName] = useState("John");

  // Fetch saved meals on component mount
  useEffect(() => {
    const fetchSavedMeals = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/users/saved");
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
      const heightInMeters = Number.parseFloat(height) / 100; // Convert height from cm to meters
      const calculatedBmi = (
        Number.parseFloat(weight) /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      setBmi(calculatedBmi);
    } else {
      setBmi(null);
    }
  }, [healthForm]);

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
        bmi: Number.parseFloat(bmi),
        waterIntake: Number.parseInt(healthForm.waterIntake),
        sleepTime: Number.parseFloat(healthForm.sleepTime),
        steps: Number.parseInt(healthForm.steps),
        caloriesBurned: Number.parseInt(healthForm.caloriesBurned),
        weight: Number.parseFloat(healthForm.weight),
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

  // BMI Category helper
  const getBmiCategory = (bmi) => {
    if (!bmi) return null;
    const bmiValue = Number.parseFloat(bmi);
    if (bmiValue < 18.5)
      return { label: "Underweight", color: "#3498db", bgColor: "#e0f2fe" };
    if (bmiValue < 24.9)
      return { label: "Normal", color: "#2ecc71", bgColor: "#dcfce7" };
    if (bmiValue < 29.9)
      return { label: "Overweight", color: "#f39c12", bgColor: "#fef3c7" };
    return { label: "Obese", color: "#e74c3c", bgColor: "#fee2e2" };
  };

  const bmiCategory = getBmiCategory(bmi);

  // Common styles
  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: "28px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const cardHeaderStyle = {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#111827",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "15px",
    transition: "all 0.2s",
    backgroundColor: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  };

  const inputFocusStyle = {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  };

  const buttonStyle = {
    padding: "14px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1d4ed8",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 6px rgba(37, 99, 235, 0.25)",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <div style={{ padding: "32px", flex: "1" }}>
          {/* Header Section */}
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#111827",
                marginBottom: "8px",
                letterSpacing: "-0.025em",
              }}
            >
              Track Me
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

          {/* Notifications */}
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

          {success && (
            <div
              style={{
                padding: "16px 20px",
                marginBottom: "28px",
                backgroundColor: "#dcfce7",
                borderLeft: "5px solid #22c55e",
                color: "#166534",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "15px",
              }}
            >
              <span style={{ fontSize: "20px" }}>✅</span>
              {success}
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
              Loading...
            </div>
          )}

          {/* Main Content Area */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
              gap: "32px",
            }}
          >
            {/* Left Column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {/* BMI Calculator Card */}
              <div
                style={cardStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                }}
              >
                <h2 style={cardHeaderStyle}>
                  <span style={{ fontSize: "24px" }}>📊</span>
                  BMI Calculator
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={healthForm.weight}
                      onChange={handleHealthFormChange}
                      placeholder="65"
                      style={inputStyle}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyle);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
                      }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={healthForm.height}
                      onChange={handleHealthFormChange}
                      placeholder="170"
                      style={inputStyle}
                      onFocus={(e) => {
                        Object.assign(e.target.style, inputFocusStyle);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
                      }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Age</label>
                    <input
                      type="number"
                      value="26"
                      disabled
                      style={{
                        ...inputStyle,
                        backgroundColor: "#f3f4f6",
                        color: "#6b7280",
                        cursor: "not-allowed",
                      }}
                    />
                  </div>

                  {/* BMI Result */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {bmi ? (
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              height: "110px",
                              width: "110px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: bmiCategory.bgColor,
                              boxShadow: `0 0 0 8px ${bmiCategory.bgColor}40, 0 0 0 16px ${bmiCategory.bgColor}20`,
                              transition: "all 0.3s ease",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "32px",
                                fontWeight: "800",
                                color: bmiCategory.color,
                              }}
                            >
                              {bmi}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: "16px",
                            padding: "6px 12px",
                            backgroundColor: bmiCategory.bgColor,
                            color: bmiCategory.color,
                            borderRadius: "20px",
                            fontWeight: "600",
                            display: "inline-block",
                            fontSize: "14px",
                          }}
                        >
                          {bmiCategory.label}
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                            marginTop: "6px",
                          }}
                        >
                          Your BMI
                        </p>
                      </div>
                    ) : (
                      <div style={{ textAlign: "center", color: "#9ca3af" }}>
                        <div
                          style={{
                            height: "110px",
                            width: "110px",
                            borderRadius: "50%",
                            backgroundColor: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                            boxShadow:
                              "0 0 0 8px #f3f4f620, 0 0 0 16px #f3f4f610",
                          }}
                        >
                          <span style={{ fontSize: "22px", fontWeight: "500" }}>
                            BMI
                          </span>
                        </div>
                        <p
                          style={{
                            marginTop: "16px",
                            fontSize: "14px",
                          }}
                        >
                          Enter weight and height
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Health Data Form Card */}
              <div
                style={cardStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                }}
              >
                <h2 style={cardHeaderStyle}>
                  <span style={{ fontSize: "24px" }}>💪</span>
                  Daily Health Tracker
                </h2>

                <form
                  onSubmit={handleHealthFormSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Water Intake (mL)</label>
                      <div style={{ position: "relative" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "18px",
                          }}
                        >
                          💧
                        </span>
                        <input
                          type="number"
                          name="waterIntake"
                          value={healthForm.waterIntake}
                          onChange={handleHealthFormChange}
                          placeholder="2000"
                          style={{
                            ...inputStyle,
                            paddingLeft: "46px",
                          }}
                          onFocus={(e) => {
                            Object.assign(e.target.style, inputFocusStyle);
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.boxShadow =
                              "0 1px 2px rgba(0,0,0,0.05)";
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Sleep Time (hours)</label>
                      <div style={{ position: "relative" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "18px",
                          }}
                        >
                          🌙
                        </span>
                        <input
                          type="number"
                          name="sleepTime"
                          value={healthForm.sleepTime}
                          onChange={handleHealthFormChange}
                          placeholder="7.5"
                          step="0.1"
                          style={{
                            ...inputStyle,
                            paddingLeft: "46px",
                          }}
                          onFocus={(e) => {
                            Object.assign(e.target.style, inputFocusStyle);
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.boxShadow =
                              "0 1px 2px rgba(0,0,0,0.05)";
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Steps Count</label>
                      <div style={{ position: "relative" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "18px",
                          }}
                        >
                          👣
                        </span>
                        <input
                          type="number"
                          name="steps"
                          value={healthForm.steps}
                          onChange={handleHealthFormChange}
                          placeholder="8000"
                          style={{
                            ...inputStyle,
                            paddingLeft: "46px",
                          }}
                          onFocus={(e) => {
                            Object.assign(e.target.style, inputFocusStyle);
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.boxShadow =
                              "0 1px 2px rgba(0,0,0,0.05)";
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Calories Burned (kcal)</label>
                      <div style={{ position: "relative" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "18px",
                          }}
                        >
                          🔥
                        </span>
                        <input
                          type="number"
                          name="caloriesBurned"
                          value={healthForm.caloriesBurned}
                          onChange={handleHealthFormChange}
                          placeholder="500"
                          style={{
                            ...inputStyle,
                            paddingLeft: "46px",
                          }}
                          onFocus={(e) => {
                            Object.assign(e.target.style, inputFocusStyle);
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.boxShadow =
                              "0 1px 2px rgba(0,0,0,0.05)";
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...buttonStyle,
                      marginTop: "16px",
                      width: "100%",
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        Object.assign(e.currentTarget.style, buttonHoverStyle);
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563eb";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 4px rgba(37, 99, 235, 0.2)";
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>💾</span>
                    Save Health Data
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Meal Logging */}
            <div
              style={{
                ...cardStyle,
                display: "flex",
                flexDirection: "column",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              <h2 style={cardHeaderStyle}>
                <span style={{ fontSize: "24px" }}>🍽️</span>
                Food Diary
              </h2>

              {savedMeals.length > 0 ? (
                <>
                  <div
                    style={{
                      overflowX: "auto",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      flex: 1,
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "15px",
                      }}
                    >
                      <thead style={{ backgroundColor: "#f9fafb" }}>
                        <tr>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedMeals.length === savedMeals.length &&
                                savedMeals.length > 0
                              }
                              onChange={() => {
                                if (
                                  selectedMeals.length === savedMeals.length
                                ) {
                                  setSelectedMeals([]);
                                } else {
                                  setSelectedMeals(
                                    savedMeals.map((meal) => meal._id)
                                  );
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                width: "18px",
                                height: "18px",
                                accentColor: "#2563eb",
                              }}
                            />
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              color: "#4b5563",
                              fontWeight: "600",
                              fontSize: "13px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Meal
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              color: "#4b5563",
                              fontWeight: "600",
                              fontSize: "13px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Calories
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              color: "#4b5563",
                              fontWeight: "600",
                              fontSize: "13px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Protein (g)
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              color: "#4b5563",
                              fontWeight: "600",
                              fontSize: "13px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Carbs (g)
                          </th>
                          <th
                            style={{
                              padding: "14px 16px",
                              textAlign: "left",
                              color: "#4b5563",
                              fontWeight: "600",
                              fontSize: "13px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Fats (g)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {savedMeals.map((meal) => (
                          <tr
                            key={meal._id}
                            style={{
                              backgroundColor: selectedMeals.includes(meal._id)
                                ? "#eff6ff"
                                : "white",
                              transition: "background-color 0.2s",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                            onMouseOver={(e) => {
                              if (!selectedMeals.includes(meal._id)) {
                                e.currentTarget.style.backgroundColor =
                                  "#f9fafb";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!selectedMeals.includes(meal._id)) {
                                e.currentTarget.style.backgroundColor = "white";
                              }
                            }}
                          >
                            <td style={{ padding: "14px 16px" }}>
                              <input
                                type="checkbox"
                                checked={selectedMeals.includes(meal._id)}
                                onChange={() => handleMealSelection(meal._id)}
                                style={{
                                  cursor: "pointer",
                                  width: "18px",
                                  height: "18px",
                                  accentColor: "#2563eb",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "14px 16px",
                                fontWeight: "600",
                                color: "#111827",
                              }}
                            >
                              {meal.name}
                            </td>
                            <td
                              style={{ padding: "14px 16px", color: "#4b5563" }}
                            >
                              {meal.calories}
                            </td>
                            <td
                              style={{ padding: "14px 16px", color: "#4b5563" }}
                            >
                              {meal.protein}
                            </td>
                            <td
                              style={{ padding: "14px 16px", color: "#4b5563" }}
                            >
                              {meal.carbs}
                            </td>
                            <td
                              style={{ padding: "14px 16px", color: "#4b5563" }}
                            >
                              {meal.fats}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#4b5563",
                        fontWeight: "500",
                      }}
                    >
                      {selectedMeals.length} item
                      {selectedMeals.length !== 1 ? "s" : ""} selected
                    </div>
                    <button
                      onClick={handleLogMeals}
                      disabled={loading || selectedMeals.length === 0}
                      style={{
                        ...buttonStyle,
                        backgroundColor:
                          selectedMeals.length === 0 ? "#d1d5db" : "#2563eb",
                        color: selectedMeals.length === 0 ? "#6b7280" : "white",
                        cursor:
                          selectedMeals.length === 0
                            ? "not-allowed"
                            : "pointer",
                      }}
                      onMouseOver={(e) => {
                        if (selectedMeals.length > 0 && !loading) {
                          Object.assign(
                            e.currentTarget.style,
                            buttonHoverStyle
                          );
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor =
                          selectedMeals.length === 0 ? "#d1d5db" : "#2563eb";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 4px rgba(37, 99, 235, 0.2)";
                      }}
                    >
                      <span style={{ fontSize: "18px" }}>✓</span>
                      Log Selected Meals
                    </button>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "60px 0",
                    textAlign: "center",
                    color: "#6b7280",
                    flex: 1,
                  }}
                >
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>
                    🍽️
                  </div>
                  <p
                    style={{
                      marginBottom: "16px",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    No saved meals available.
                  </p>
                  <a
                    href="/meal-ideas"
                    style={{
                      color: "#2563eb",
                      textDecoration: "none",
                      padding: "10px 16px",
                      border: "1px solid #2563eb",
                      borderRadius: "8px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563eb";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#2563eb";
                    }}
                  >
                    Add meals via the Meal Ideas page
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

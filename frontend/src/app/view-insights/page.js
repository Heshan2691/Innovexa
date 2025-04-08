// 'use client';

// import { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import Navbar from '../../components/Navbar';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale);

// export default function ViewInsights() {
//   const [healthData, setHealthData] = useState([]);
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         const endDate = new Date();
//         const startDate = new Date();
//         startDate.setDate(endDate.getDate() - 30);

//         const healthResponse = await api.get('/health-data', {
//           params: {
//             startDate: startDate.toISOString(),
//             endDate: endDate.toISOString(),
//           },
//         });
//         setHealthData(healthResponse.data);

//         const mealsResponse = await api.get('/meals/saved');
//         setMeals(mealsResponse.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const SleepAnalysis = () => {
//     const past7Days = healthData.filter((data) => {
//       const dataDate = new Date(data.date);
//       const today = new Date();
//       const past7DaysDate = new Date(today);
//       past7DaysDate.setDate(today.getDate() - 7);
//       return dataDate >= past7DaysDate && dataDate <= today;
//     });

//     const totalSleep = past7Days.reduce((sum, data) => sum + data.sleepTime, 0);
//     const averageSleep = past7Days.length > 0 ? (totalSleep / past7Days.length).toFixed(1) : 0;

//     const chartData = {
//       datasets: [
//         {
//           label: 'Sleep Time (hours)',
//           data: past7Days.map((data) => ({
//             x: new Date(data.date),
//             y: data.sleepTime,
//           })),
//           borderColor: '#007bff',
//           backgroundColor: 'rgba(0, 123, 255, 0.1)',
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };

//     const chartOptions = {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day',
//           },
//           title: {
//             display: true,
//             text: 'Date',
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Sleep Time (hours)',
//           },
//           beginAtZero: true,
//         },
//       },
//     };

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Sleep Analysis</h2>
//         <p>Average Sleep: {averageSleep} hours</p>
//         {past7Days.length > 0 ? (
//           <div style={{ height: '200px' }}>
//             <Line data={chartData} options={chartOptions} />
//           </div>
//         ) : (
//           <p>No sleep data available for the past 7 days.</p>
//         )}
//       </div>
//     );
//   };

//   const NutritionAnalysis = () => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const todayMeals = meals.filter((meal) => {
//       const mealDate = new Date(meal.date);
//       return mealDate.toDateString() === today.toDateString();
//     });

//     const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
//     const totalProtein = todayMeals.reduce((sum, meal) => sum + meal.protein, 0);
//     const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0);
//     const totalFats = todayMeals.reduce((sum, meal) => sum + meal.fats, 0);

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Nutrition Analysis (Today)</h2>
//         {todayMeals.length > 0 ? (
//           <div style={{ display: 'flex', gap: '20px' }}>
//             <div style={{ textAlign: 'center' }}>
//               <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCalories}</p>
//               <p>Calories (kcal)</p>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalProtein}</p>
//               <p>Protein (g)</p>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCarbs}</p>
//               <p>Carbs (g)</p>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalFats}</p>
//               <p>Fats (g)</p>
//             </div>
//           </div>
//         ) : (
//           <p>No meals logged for today.</p>
//         )}
//       </div>
//     );
//   };

//   const DailyCalorieGoal = () => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const todayMeals = meals.filter((meal) => {
//       const mealDate = new Date(meal.date);
//       return mealDate.toDateString() === today.toDateString();
//     });

//     const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
//     const calorieGoal = 2000;
//     const remainingCalories = Math.max(0, calorieGoal - totalCalories);
//     const progressPercentage = (totalCalories / calorieGoal) * 100;

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Daily Calorie Goal</h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//           <div style={{ textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCalories}/{calorieGoal}</p>
//             <p>Calories (kcal)</p>
//           </div>
//           <div style={{ flex: 1 }}>
//             <div
//               style={{
//                 width: '100%',
//                 backgroundColor: '#e0e0e0',
//                 borderRadius: '5px',
//                 height: '20px',
//               }}
//             >
//               <div
//                 style={{
//                   width: `${progressPercentage}%`,
//                   backgroundColor: '#007bff',
//                   height: '100%',
//                   borderRadius: '5px',
//                 }}
//               ></div>
//             </div>
//             <p>Remaining: {remainingCalories} kcal</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const WaterIntake = () => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const todayHealthData = healthData.find((data) => {
//       const dataDate = new Date(data.date);
//       return dataDate.toDateString() === today.toDateString();
//     });

//     const waterConsumed = todayHealthData ? todayHealthData.waterIntake : 0;
//     const waterTarget = 2000;
//     const remainingWater = Math.max(0, waterTarget - waterConsumed);
//     const progressPercentage = (waterConsumed / waterTarget) * 100;

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Water Intake</h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//           <div style={{ textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{waterConsumed}/{waterTarget}</p>
//             <p>Water (mL)</p>
//           </div>
//           <div style={{ flex: 1 }}>
//             <div
//               style={{
//                 width: '100%',
//                 backgroundColor: '#e0e0e0',
//                 borderRadius: '5px',
//                 height: '20px',
//               }}
//             >
//               <div
//                 style={{
//                   width: `${progressPercentage}%`,
//                   backgroundColor: '#007bff',
//                   height: '100%',
//                   borderRadius: '5px',
//                 }}
//               ></div>
//             </div>
//             <p>Remaining: {remainingWater} mL</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const WeeklyHydrationAnalysis = () => {
//     const past7Days = healthData.filter((data) => {
//       const dataDate = new Date(data.date);
//       const today = new Date();
//       const past7DaysDate = new Date(today);
//       past7DaysDate.setDate(today.getDate() - 7);
//       return dataDate >= past7DaysDate && dataDate <= today;
//     });

//     const chartData = {
//       datasets: [
//         {
//           label: 'Water Intake (mL)',
//           data: past7Days.map((data) => ({
//             x: new Date(data.date),
//             y: data.waterIntake,
//           })),
//           borderColor: '#007bff',
//           backgroundColor: 'rgba(0, 123, 255, 0.1)',
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };

//     const chartOptions = {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day',
//           },
//           title: {
//             display: true,
//             text: 'Date',
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Water Intake (mL)',
//           },
//           beginAtZero: true,
//         },
//       },
//     };

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Weekly Hydration Analysis</h2>
//         {past7Days.length > 0 ? (
//           <div style={{ height: '200px' }}>
//             <Line data={chartData} options={chartOptions} />
//           </div>
//         ) : (
//           <p>No water intake data available for the past 7 days.</p>
//         )}
//       </div>
//     );
//   };

//   const ActivityGrowthAnalysis = () => {
//     const past7Days = healthData.filter((data) => {
//       const dataDate = new Date(data.date);
//       const today = new Date();
//       const past7DaysDate = new Date(today);
//       past7DaysDate.setDate(today.getDate() - 7);
//       return dataDate >= past7DaysDate && dataDate <= today;
//     });

//     const chartData = {
//       datasets: [
//         {
//           label: 'Steps',
//           data: past7Days.map((data) => ({
//             x: new Date(data.date),
//             y: data.steps,
//           })),
//           borderColor: '#007bff',
//           backgroundColor: 'rgba(0, 123, 255, 0.1)',
//           fill: false,
//           tension: 0.4,
//           yAxisID: 'y1',
//         },
//         {
//           label: 'Calories Burned (kcal)',
//           data: past7Days.map((data) => ({
//             x: new Date(data.date),
//             y: data.caloriesBurned,
//           })),
//           borderColor: '#ff7300',
//           backgroundColor: 'rgba(255, 115, 0, 0.1)',
//           fill: false,
//           tension: 0.4,
//           yAxisID: 'y2',
//         },
//       ],
//     };

//     const chartOptions = {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day',
//           },
//           title: {
//             display: true,
//             text: 'Date',
//           },
//         },
//         y1: {
//           position: 'left',
//           title: {
//             display: true,
//             text: 'Steps',
//           },
//           beginAtZero: true,
//         },
//         y2: {
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Calories Burned (kcal)',
//           },
//           beginAtZero: true,
//         },
//       },
//     };

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Activity Growth</h2>
//         {past7Days.length > 0 ? (
//           <div style={{ height: '200px' }}>
//             <Line data={chartData} options={chartOptions} />
//           </div>
//         ) : (
//           <p>No activity data available for the past 7 days.</p>
//         )}
//       </div>
//     );
//   };

//   const BMIAnalysis = () => {
//     const currentBMI = healthData.length > 0 ? healthData[0].bmi : 0;

//     let bmiCategory = '';
//     if (currentBMI < 18.5) bmiCategory = 'Underweight';
//     else if (currentBMI >= 18.5 && currentBMI < 25) bmiCategory = 'Normal';
//     else if (currentBMI >= 25 && currentBMI < 30) bmiCategory = 'Overweight';
//     else bmiCategory = 'Obese';

//     const chartData = {
//       datasets: [
//         {
//           label: 'BMI',
//           data: healthData.map((data) => ({
//             x: new Date(data.date),
//             y: data.bmi,
//           })),
//           borderColor: '#007bff',
//           backgroundColor: 'rgba(0, 123, 255, 0.1)',
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };

//     const chartOptions = {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day',
//           },
//           title: {
//             display: true,
//             text: 'Date',
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'BMI',
//           },
//           beginAtZero: true,
//         },
//       },
//     };

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>BMI Analysis</h2>
//         <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
//           <div>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{currentBMI}</p>
//             <p>Category: {bmiCategory}</p>
//           </div>
//           {healthData.length > 0 ? (
//             <div style={{ flex: 1, height: '200px' }}>
//               <Line data={chartData} options={chartOptions} />
//             </div>
//           ) : (
//             <p>No BMI data available.</p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const WeightAnalysis = () => {
//     const chartData = {
//       datasets: [
//         {
//           label: 'Weight (kg)',
//           data: healthData.map((data) => ({
//             x: new Date(data.date),
//             y: data.weight,
//           })),
//           borderColor: '#007bff',
//           backgroundColor: 'rgba(0, 123, 255, 0.1)',
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };

//     const chartOptions = {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day',
//           },
//           title: {
//             display: true,
//             text: 'Date',
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Weight (kg)',
//           },
//           beginAtZero: false,
//         },
//       },
//     };

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Weight Analysis</h2>
//         {healthData.length > 0 ? (
//           <div style={{ height: '200px' }}>
//             <Line data={chartData} options={chartOptions} />
//           </div>
//         ) : (
//           <p>No weight data available.</p>
//         )}
//       </div>
//     );
//   };

//   const CaloriesActivitiesAnalysis = () => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const todayHealthData = healthData.find((data) => {
//       const dataDate = new Date(data.date);
//       return dataDate.toDateString() === today.toDateString();
//     });
//     const todayMeals = meals.filter((meal) => {
//       const mealDate = new Date(meal.date);
//       return mealDate.toDateString() === today.toDateString();
//     });

//     const caloriesBurned = todayHealthData ? todayHealthData.caloriesBurned : 0;
//     const caloriesConsumed = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Calories Activities</h2>
//         <div style={{ display: 'flex', gap: '20px' }}>
//           <div style={{ textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{caloriesConsumed}</p>
//             <p>Calories Consumed (kcal)</p>
//           </div>
//           <div style={{ textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{caloriesBurned}</p>
//             <p>Calories Burned (kcal)</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const HealthTips = () => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const todayHealthData = healthData.find((data) => {
//       const dataDate = new Date(data.date);
//       return dataDate.toDateString() === today.toDateString();
//     });

//     const waterConsumed = todayHealthData ? todayHealthData.waterIntake : 0;
//     const waterTarget = 2000;
//     const sleepTime = todayHealthData ? todayHealthData.sleepTime : 0;

//     const tips = [
//       waterConsumed < waterTarget ? 'Drink more water to reach your daily target!' : 'Great job staying hydrated!',
//       sleepTime < 7 ? 'Aim for at least 7 hours of sleep for better health.' : 'You’re getting enough sleep—keep it up!',
//       'Incorporate more veggies into your meals for added nutrients.',
//     ];

//     return (
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Health & Nutrition Tips</h2>
//         <ul>
//           {tips.map((tip, index) => (
//             <li key={index} style={{ margin: '10px 0' }}>{tip}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
//       <div
//         style={{
//           width: '250px',
//           backgroundColor: '#1a3c34',
//           color: '#fff',
//           padding: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <img
//             src="https://via.placeholder.com/80"
//             alt="Profile"
//             style={{ borderRadius: '50%', marginBottom: '10px' }}
//           />
//           <h3>John Doe</h3>
//           <p>Weight: 65 kg</p>
//           <p>Height: 170 cm</p>
//         </div>
//         <nav style={{ width: '100%' }}>
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             <li style={{ margin: '10px 0' }}>
//               <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
//                 Dashboard
//               </a>
//             </li>
//             <li style={{ margin: '10px 0' }}>
//               <a href="/add-data" style={{ color: '#fff', textDecoration: 'none' }}>
//                 Add Data
//               </a>
//             </li>
//             <li style={{ margin: '10px 0' }}>
//               <a href="/view-insights" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
//                 View Insights
//               </a>
//             </li>
//             <li style={{ margin: '10px 0' }}>
//               <a href="/meal-blogs" style={{ color: '#fff', textDecoration: 'none' }}>
//                 Meal Blogs
//               </a>
//             </li>
//             <li style={{ margin: '10px 0' }}>
//               <a href="/logout" style={{ color: '#fff', textDecoration: 'none' }}>
//                 Log Out
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <div style={{ flex: 1, padding: '20px' }}>
//         <Navbar />
//         <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//           <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Good Morning, John</h1>
//           <p style={{ color: '#666', marginBottom: '20px' }}>
//             {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//           </p>

//           {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
//           {loading && <p>Loading insights...</p>}

//           <div style={{ marginBottom: '20px' }}>
//             <SleepAnalysis />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <NutritionAnalysis />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <DailyCalorieGoal />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <WaterIntake />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <WeeklyHydrationAnalysis />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <ActivityGrowthAnalysis />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <BMIAnalysis />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <WeightAnalysis />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <CaloriesActivitiesAnalysis />
//           </div>

//           <div style={{ marginBottom: '20px' }}>
//             <HealthTips />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../molecules/sidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function ViewInsights() {
  const [healthData, setHealthData] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        const healthResponse = await api.get("/users/health-data", {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });
        setHealthData(healthResponse.data);

        const mealsResponse = await api.get("/users/saved");
        setMeals(mealsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Common styles
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

  const chartContainerStyle = {
    height: "250px",
    marginTop: "20px",
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

  const tabStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };

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

    const chartData = {
      datasets: [
        {
          label: "Sleep Time (hours)",
          data: past7Days.map((data) => ({
            x: new Date(data.date),
            y: data.sleepTime,
          })),
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: "#8b5cf6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM dd",
            displayFormats: {
              day: "MMM dd",
            },
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "Hours",
            font: {
              size: 12,
              weight: "bold",
            },
          },
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          callbacks: {
            label: (context) => `Sleep: ${context.parsed.y} hours`,
          },
        },
      },
    };

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>🌙</span>
          Sleep Analysis
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              ...statCardStyle,
              flex: 1,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
            }}
          >
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
            <p style={{ fontSize: "14px", color: "#6b7280" }}>Avg. Hours</p>
          </div>

          <div
            style={{
              ...statCardStyle,
              flex: 1,
              backgroundColor:
                averageSleep >= 7
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(234, 179, 8, 0.1)",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: averageSleep >= 7 ? "#16a34a" : "#ca8a04",
                marginBottom: "4px",
              }}
            >
              {averageSleep >= 7 ? "Good Sleep" : "Needs Improvement"}
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>Status</p>
          </div>
        </div>

        {past7Days.length > 0 ? (
          <div style={chartContainerStyle}>
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              color: "#6b7280",
            }}
          >
            <p>No sleep data available for the past 7 days.</p>
          </div>
        )}
      </div>
    );
  };

  const NutritionAnalysis = () => {
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
    const totalProtein = todayMeals.reduce(
      (sum, meal) => sum + meal.protein,
      0
    );
    const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFats = todayMeals.reduce((sum, meal) => sum + meal.fats, 0);

    const nutritionItems = [
      {
        label: "Calories",
        value: totalCalories,
        unit: "kcal",
        color: "#ef4444",
        icon: "🔥",
      },
      {
        label: "Protein",
        value: totalProtein,
        unit: "g",
        color: "#3b82f6",
        icon: "🥩",
      },
      {
        label: "Carbs",
        value: totalCarbs,
        unit: "g",
        color: "#f59e0b",
        icon: "🍚",
      },
      {
        label: "Fats",
        value: totalFats,
        unit: "g",
        color: "#10b981",
        icon: "🥑",
      },
    ];

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>🍽️</span>
          Nutrition Analysis (Today)
        </h2>

        {todayMeals.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
            }}
          >
            {nutritionItems.map((item, index) => (
              <div
                key={index}
                style={{
                  ...statCardStyle,
                  backgroundColor: `${item.color}10`,
                  padding: "20px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 10px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                  {item.icon}
                </div>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: item.color,
                    marginBottom: "4px",
                  }}
                >
                  {item.value}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  {item.label} ({item.unit})
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              color: "#6b7280",
            }}
          >
            <p>No meals logged for today.</p>
          </div>
        )}
      </div>
    );
  };

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
    const remainingCalories = Math.max(0, calorieGoal - totalCalories);
    const progressPercentage = Math.min(
      100,
      (totalCalories / calorieGoal) * 100
    );

    let statusColor = "#10b981"; // Green
    if (progressPercentage > 100) {
      statusColor = "#ef4444"; // Red
    } else if (progressPercentage > 85) {
      statusColor = "#f59e0b"; // Amber
    }

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>🎯</span>
          Daily Calorie Goal
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                ...statCardStyle,
                flex: "0 0 150px",
                backgroundColor: `${statusColor}10`,
              }}
            >
              <p
                style={{
                  fontSize: "28px",
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

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#4b5563",
                  }}
                >
                  {progressPercentage.toFixed(0)}% of daily goal
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#4b5563",
                  }}
                >
                  {remainingCalories} kcal remaining
                </p>
              </div>

              <div style={progressBarContainerStyle}>
                <div
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: statusColor,
                    height: "100%",
                    borderRadius: "8px",
                    transition: "width 0.5s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#4b5563",
              borderLeft: `4px solid ${statusColor}`,
            }}
          >
            <p style={{ fontWeight: "500" }}>
              {progressPercentage > 100
                ? "You have exceeded your daily calorie goal."
                : progressPercentage > 85
                ? "You are close to your daily calorie goal."
                : "You still have calories left for today."}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const WaterIntake = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayHealthData = healthData.find((data) => {
      const dataDate = new Date(data.date);
      return dataDate.toDateString() === today.toDateString();
    });

    const waterConsumed = todayHealthData ? todayHealthData.waterIntake : 0;
    const waterTarget = 2000;
    const remainingWater = Math.max(0, waterTarget - waterConsumed);
    const progressPercentage = Math.min(
      100,
      (waterConsumed / waterTarget) * 100
    );

    let statusColor = "#3b82f6"; // Blue
    if (progressPercentage < 50) {
      statusColor = "#ef4444"; // Red
    } else if (progressPercentage < 75) {
      statusColor = "#f59e0b"; // Amber
    }

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>💧</span>
          Water Intake
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                ...statCardStyle,
                flex: "0 0 150px",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "28px",
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

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#4b5563",
                  }}
                >
                  {progressPercentage.toFixed(0)}% of daily goal
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#4b5563",
                  }}
                >
                  {remainingWater} mL remaining
                </p>
              </div>

              <div style={progressBarContainerStyle}>
                <div
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: statusColor,
                    height: "100%",
                    borderRadius: "8px",
                    transition: "width 0.5s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "#f0f9ff",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#1e40af",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "20px" }}>💡</span>
            <p>
              {progressPercentage < 50
                ? "You need to drink more water. Staying hydrated is essential for your health."
                : progressPercentage < 75
                ? "You're making progress with your water intake. Keep going!"
                : "Great job staying hydrated today!"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const WeeklyHydrationAnalysis = () => {
    const past7Days = healthData.filter((data) => {
      const dataDate = new Date(data.date);
      const today = new Date();
      const past7DaysDate = new Date(today);
      past7DaysDate.setDate(today.getDate() - 7);
      return dataDate >= past7DaysDate && dataDate <= today;
    });

    const chartData = {
      datasets: [
        {
          label: "Water Intake (mL)",
          data: past7Days.map((data) => ({
            x: new Date(data.date),
            y: data.waterIntake,
          })),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM dd",
            displayFormats: {
              day: "MMM dd",
            },
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "mL",
            font: {
              size: 12,
              weight: "bold",
            },
          },
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          callbacks: {
            label: (context) => `Water: ${context.parsed.y} mL`,
          },
        },
      },
    };

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>💧</span>
          Weekly Hydration Analysis
        </h2>

        {past7Days.length > 0 ? (
          <div style={chartContainerStyle}>
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              color: "#6b7280",
            }}
          >
            <p>No water intake data available for the past 7 days.</p>
          </div>
        )}
      </div>
    );
  };

  const ActivityGrowthAnalysis = () => {
    const past7Days = healthData.filter((data) => {
      const dataDate = new Date(data.date);
      const today = new Date();
      const past7DaysDate = new Date(today);
      past7DaysDate.setDate(today.getDate() - 7);
      return dataDate >= past7DaysDate && dataDate <= today;
    });

    const chartData = {
      datasets: [
        {
          label: "Steps",
          data: past7Days.map((data) => ({
            x: new Date(data.date),
            y: data.steps,
          })),
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: false,
          tension: 0.4,
          yAxisID: "y1",
          borderWidth: 3,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
        {
          label: "Calories Burned",
          data: past7Days.map((data) => ({
            x: new Date(data.date),
            y: data.caloriesBurned,
          })),
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          fill: false,
          tension: 0.4,
          yAxisID: "y2",
          borderWidth: 3,
          pointBackgroundColor: "#f59e0b",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM dd",
            displayFormats: {
              day: "MMM dd",
            },
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y1: {
          position: "left",
          title: {
            display: true,
            text: "Steps",
            font: {
              size: 12,
              weight: "bold",
            },
            color: "#10b981",
          },
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
            color: "#10b981",
          },
        },
        y2: {
          position: "right",
          title: {
            display: true,
            text: "Calories (kcal)",
            font: {
              size: 12,
              weight: "bold",
            },
            color: "#f59e0b",
          },
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
            color: "#f59e0b",
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            boxHeight: 8,
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
        },
      },
    };

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>📈</span>
          Activity Growth
        </h2>

        {past7Days.length > 0 ? (
          <div style={chartContainerStyle}>
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              color: "#6b7280",
            }}
          >
            <p>No activity data available for the past 7 days.</p>
          </div>
        )}
      </div>
    );
  };

  const BMIAnalysis = () => {
    const currentBMI = healthData.length > 0 ? healthData[0].bmi : 0;

    let bmiCategory = "";
    let bmiColor = "";
    let bmiBgColor = "";

    if (currentBMI < 18.5) {
      bmiCategory = "Underweight";
      bmiColor = "#3b82f6"; // Blue
      bmiBgColor = "rgba(59, 130, 246, 0.1)";
    } else if (currentBMI >= 18.5 && currentBMI < 25) {
      bmiCategory = "Normal";
      bmiColor = "#10b981"; // Green
      bmiBgColor = "rgba(16, 185, 129, 0.1)";
    } else if (currentBMI >= 25 && currentBMI < 30) {
      bmiCategory = "Overweight";
      bmiColor = "#f59e0b"; // Amber
      bmiBgColor = "rgba(245, 158, 11, 0.1)";
    } else {
      bmiCategory = "Obese";
      bmiColor = "#ef4444"; // Red
      bmiBgColor = "rgba(239, 68, 68, 0.1)";
    }

    const chartData = {
      datasets: [
        {
          label: "BMI",
          data: healthData.map((data) => ({
            x: new Date(data.date),
            y: data.bmi,
          })),
          borderColor: bmiColor,
          backgroundColor: bmiBgColor,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: bmiColor,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM dd",
            displayFormats: {
              day: "MMM dd",
            },
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "BMI",
            font: {
              size: 12,
              weight: "bold",
            },
          },
          beginAtZero: false,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          callbacks: {
            label: (context) => `BMI: ${context.parsed.y}`,
          },
        },
      },
    };

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>⚖️</span>
          BMI Analysis
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              ...statCardStyle,
              flex: "0 0 150px",
              backgroundColor: bmiBgColor,
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
                backgroundColor: bmiBgColor,
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

          <div
            style={{
              flex: 1,
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#4b5563",
              borderLeft: `4px solid ${bmiColor}`,
            }}
          >
            <p
              style={{
                fontWeight: "500",
                marginBottom: "8px",
                color: "#111827",
              }}
            >
              {bmiCategory === "Normal"
                ? "Your BMI is within the healthy range."
                : `Your BMI indicates you are ${bmiCategory.toLowerCase()}.`}
            </p>
            <p>
              {bmiCategory === "Underweight"
                ? "Consider consulting with a nutritionist about healthy weight gain strategies."
                : bmiCategory === "Normal"
                ? "Maintain your healthy lifestyle with balanced nutrition and regular exercise."
                : "Focus on a balanced diet and regular exercise to move toward a healthier BMI range."}
            </p>
          </div>
        </div>

        {healthData.length > 0 ? (
          <div style={chartContainerStyle}>
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              color: "#6b7280",
            }}
          >
            <p>No BMI data available.</p>
          </div>
        )}
      </div>
    );
  };

  const WeightAnalysis = () => {
    const chartData = {
      datasets: [
        {
          label: "Weight (kg)",
          data: healthData.map((data) => ({
            x: new Date(data.date),
            y: data.weight,
          })),
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: "#8b5cf6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM dd",
            displayFormats: {
              day: "MMM dd",
            },
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "Weight (kg)",
            font: {
              size: 12,
              weight: "bold",
            },
          },
          beginAtZero: false,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          callbacks: {
            label: (context) => `Weight: ${context.parsed.y} kg`,
          },
        },
      },
    };

    // Calculate weight change
    let weightChange = 0;
    let weightChangeText = "";
    let weightChangeColor = "";

    if (healthData.length >= 2) {
      const latestWeight = healthData[0].weight;
      const earliestWeight = healthData[healthData.length - 1].weight;
      weightChange = latestWeight - earliestWeight;

      if (weightChange > 0) {
        weightChangeText = `+${weightChange.toFixed(1)} kg`;
        weightChangeColor = "#ef4444"; // Red
      } else if (weightChange < 0) {
        weightChangeText = `${weightChange.toFixed(1)} kg`;
        weightChangeColor = "#10b981"; // Green
      } else {
        weightChangeText = "No change";
        weightChangeColor = "#6b7280"; // Gray
      }
    }

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>⚖️</span>
          Weight Analysis
        </h2>

        {healthData.length > 0 && (
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div
              style={{
                ...statCardStyle,
                flex: "0 0 150px",
                backgroundColor: "rgba(139, 92, 246, 0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#8b5cf6",
                  marginBottom: "4px",
                }}
              >
                {healthData[0].weight}
              </p>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>
                Current Weight (kg)
              </p>
            </div>

            {weightChange !== 0 && (
              <div
                style={{
                  ...statCardStyle,
                  flex: "0 0 150px",
                  backgroundColor:
                    weightChange > 0
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(16, 185, 129, 0.1)",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: weightChangeColor,
                    marginBottom: "4px",
                  }}
                >
                  {weightChangeText}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  30-Day Change
                </p>
              </div>
            )}
          </div>
        )}

        {healthData.length > 0 ? (
          <div style={chartContainerStyle}>
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              color: "#6b7280",
            }}
          >
            <p>No weight data available.</p>
          </div>
        )}
      </div>
    );
  };

  const CaloriesActivitiesAnalysis = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayHealthData = healthData.find((data) => {
      const dataDate = new Date(data.date);
      return dataDate.toDateString() === today.toDateString();
    });
    const todayMeals = meals.filter((meal) => {
      const mealDate = new Date(meal.date);
      return mealDate.toDateString() === today.toDateString();
    });

    const caloriesBurned = todayHealthData ? todayHealthData.caloriesBurned : 0;
    const caloriesConsumed = todayMeals.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );
    const netCalories = caloriesConsumed - caloriesBurned;

    let netCaloriesColor = "#6b7280"; // Gray
    if (netCalories > 500) {
      netCaloriesColor = "#ef4444"; // Red
    } else if (netCalories < 0) {
      netCaloriesColor = "#10b981"; // Green
    } else {
      netCaloriesColor = "#f59e0b"; // Amber
    }

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>🔄</span>
          Calories Balance
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              ...statCardStyle,
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              padding: "20px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🍽️</div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#ef4444",
                marginBottom: "4px",
              }}
            >
              {caloriesConsumed}
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Calories In (kcal)
            </p>
          </div>

          <div
            style={{
              ...statCardStyle,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              padding: "20px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔥</div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#10b981",
                marginBottom: "4px",
              }}
            >
              {caloriesBurned}
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Calories Out (kcal)
            </p>
          </div>

          <div
            style={{
              ...statCardStyle,
              backgroundColor: `${netCaloriesColor}10`,
              padding: "20px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚖️</div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: netCaloriesColor,
                marginBottom: "4px",
              }}
            >
              {netCalories}
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Net Calories (kcal)
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#4b5563",
            borderLeft: `4px solid ${netCaloriesColor}`,
          }}
        >
          <p style={{ fontWeight: "500" }}>
            {netCalories > 500
              ? "You have a calorie surplus. Consider increasing your activity level."
              : netCalories < 0
              ? "You have a calorie deficit, which may lead to weight loss."
              : "Your calorie balance is moderate."}
          </p>
        </div>
      </div>
    );
  };

  const HealthTips = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayHealthData = healthData.find((data) => {
      const dataDate = new Date(data.date);
      return dataDate.toDateString() === today.toDateString();
    });

    const waterConsumed = todayHealthData ? todayHealthData.waterIntake : 0;
    const waterTarget = 2000;
    const sleepTime = todayHealthData ? todayHealthData.sleepTime : 0;

    const tips = [
      {
        icon: "💧",
        title: "Hydration",
        text:
          waterConsumed < waterTarget
            ? "Drink more water to reach your daily target!"
            : "Great job staying hydrated!",
        color: "#3b82f6",
      },
      {
        icon: "🌙",
        title: "Sleep",
        text:
          sleepTime < 7
            ? "Aim for at least 7 hours of sleep for better health."
            : "You&apos;re getting enough sleep—keep it up!",
        color: "#8b5cf6",
      },
      {
        icon: "🥗",
        title: "Nutrition",
        text: "Incorporate more veggies into your meals for added nutrients.",
        color: "#10b981",
      },
      {
        icon: "🧠",
        title: "Mental Health",
        text: "Take short breaks during work to reduce stress and improve focus.",
        color: "#f59e0b",
      },
    ];

    return (
      <div style={cardStyle}>
        <h2 style={cardHeaderStyle}>
          <span style={{ fontSize: "24px" }}>💡</span>
          Health & Nutrition Tips
        </h2>

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
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  {tip.title}
                </h3>
              </div>
              <p style={{ fontSize: "14px", color: "#4b5563" }}>{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Tabs for organizing content
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "nutrition", label: "Nutrition", icon: "🍽️" },
    { id: "activity", label: "Activity", icon: "🏃‍♂️" },
    { id: "body", label: "Body Metrics", icon: "⚖️" },
  ];

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
              Health Insights
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
              Loading insights...
            </div>
          )}

          {/* Tabs Navigation */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    ...tabStyle,
                    backgroundColor:
                      activeTab === tab.id ? "#f3f4f6" : "transparent",
                    color: activeTab === tab.id ? "#111827" : "#6b7280",
                    fontWeight: activeTab === tab.id ? "600" : "500",
                    border: "none",
                  }}
                  onMouseOver={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span style={{ marginRight: "8px", fontSize: "18px" }}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "24px",
                  marginBottom: "24px",
                }}
              >
                <DailyCalorieGoal />
                <WaterIntake />
              </div>
              <SleepAnalysis />
              <NutritionAnalysis />
              <HealthTips />
            </>
          )}

          {activeTab === "nutrition" && (
            <>
              <NutritionAnalysis />
              <DailyCalorieGoal />
              <WaterIntake />
              <WeeklyHydrationAnalysis />
              <CaloriesActivitiesAnalysis />
            </>
          )}

          {activeTab === "activity" && (
            <>
              <ActivityGrowthAnalysis />
              <CaloriesActivitiesAnalysis />
              <SleepAnalysis />
            </>
          )}

          {activeTab === "body" && (
            <>
              <BMIAnalysis />
              <WeightAnalysis />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

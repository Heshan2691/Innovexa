import axios from "axios";
const token = localStorage.getItem("token");

// Create an Axios instance with the base URL of the backend
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust this if your backend runs on a different port or domain
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
});

export default api;

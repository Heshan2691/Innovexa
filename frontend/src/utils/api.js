import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in requests
if (typeof window !== "undefined") {
  // Check if we're on the client side
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // If we get a 401, the token might be expired
        console.log("Authentication error. Redirecting to login...");
        localStorage.removeItem("token"); // Clear invalid token

        // Only redirect if we're not already on the login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
}

export default api;

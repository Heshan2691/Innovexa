import axios from "axios";

// Create an Axios instance with the base URL of the backend
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust this if your backend runs on a different port or domain
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach the access token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 errors by refreshing the token
api.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 (Unauthorized) and we haven't already retried the request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops

      try {
        // Get the refresh token from localStorage
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Call the refresh-token endpoint to get a new access token
        const response = await axios.post(
          "http://localhost:5000/api/users/refresh-token",
          {
            refreshToken,
          }
        );

        const { accessToken } = response.data;

        // Store the new access token in localStorage
        localStorage.setItem("accessToken", accessToken);

        // Update the Authorization header with the new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // If the error is not a 401 or retry fails, reject the error
    return Promise.reject(error);
  }
);

export default api;

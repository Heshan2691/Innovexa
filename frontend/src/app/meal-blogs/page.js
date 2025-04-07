"use client";

import { useState, useEffect } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../molecules/sidebar";
import Link from "next/link"; // Import Link for navigation

export default function MealBlogs() {
  const [mealBlogs, setMealBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch meal blogs from your backend (which fetches from NewsAPI)
  useEffect(() => {
    const fetchMealBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/external-meal-blogs");
        setMealBlogs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch meal blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchMealBlogs();
  }, []);

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
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Meal Blogs</h1>
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
          {loading && <p>Loading meal blogs...</p>}

          {/* Display Meal Blogs */}
          {mealBlogs.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {mealBlogs.map((blog) => (
                <div
                  key={blog._id}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "15px",
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
                      {blog.title}
                    </h2>
                    <p style={{ color: "#666", marginBottom: "10px" }}>
                      By {blog.author} |{" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p style={{ marginBottom: "10px" }}>{blog.content}</p>
                    {/* Add Read More Button */}
                    <Link href={`/meal-blogs/${encodeURIComponent(blog._id)}`}>
                      <button
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>No meal blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

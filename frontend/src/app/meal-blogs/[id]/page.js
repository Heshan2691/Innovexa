"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../utils/api";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../molecules/sidebar";

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic id from the URL

  // Fetch the specific blog post
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return; // Wait until id is available

      try {
        setLoading(true);
        setError("");

        // Fetch all blogs from the backend
        const response = await api.get("/external-meal-blogs");
        const blogs = response.data;

        // Find the blog with the matching id
        const decodedId = decodeURIComponent(id); // Decode the URL-encoded id
        const selectedBlog = blogs.find((b) => b._id === decodedId);

        if (!selectedBlog) {
          throw new Error("Blog post not found");
        }

        setBlog(selectedBlog);
      } catch (err) {
        setError(err.message || "Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle Back Navigation
  const handleBack = () => {
    router.push("/meal-blogs");
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
          {/* Back Button */}
          <button
            onClick={handleBack}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Back to Meal Blogs
          </button>

          {error && (
            <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
          )}
          {loading && <p>Loading blog post...</p>}

          {/* Blog Details */}
          {blog ? (
            <div>
              <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
                {blog.title}
              </h1>
              <p style={{ color: "#666", marginBottom: "20px" }}>
                By {blog.author} |{" "}
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=No+Image";
                  }}
                />
              )}
              <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
                {blog.content}
              </p>
              {/* Link to the Original Article */}
              <p>
                <a
                  href={blog._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Read the full article on the original site
                </a>
              </p>
            </div>
          ) : (
            !loading && !error && <p>Blog post not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

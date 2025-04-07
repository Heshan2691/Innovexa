"use client";

import { useState, useEffect } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../molecules/sidebar";
import BlogCard from "../../molecules/BlogCard"; // Import the BlogCard component
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${colors.brightWhite};
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
`;

const Title = styled.h1`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 28px;
  color: ${colors.deepSlate};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3 columns
  gap: 30px; // Space between cards
  justify-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${colors.steelGray};
`;

const NoBlogsMessage = styled.p`
  text-align: center;
  color: ${colors.steelGray};
`;

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
    <PageContainer>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <MainContent>
        <Navbar />
        <Title>Meal Blogs</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <LoadingMessage>Loading meal blogs...</LoadingMessage>}

        {/* Display Meal Blogs in a Grid */}
        {mealBlogs.length > 0 ? (
          <BlogGrid>
            {mealBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                image={
                  blog.image ||
                  "https://via.placeholder.com/300x150?text=No+Image"
                }
                date={new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                title={blog.title}
                description={blog.content.slice(0, 100) + "..."} // Truncate content for description
                onReadMore={() => {
                  window.location.href = `/meal-blogs/${encodeURIComponent(
                    blog._id
                  )}`; // Navigate to blog details page
                }}
              />
            ))}
          </BlogGrid>
        ) : (
          !loading && <NoBlogsMessage>No meal blogs available.</NoBlogsMessage>
        )}
      </MainContent>
    </PageContainer>
  );
}

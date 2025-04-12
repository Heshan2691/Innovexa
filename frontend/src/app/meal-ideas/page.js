"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import MealIdeasCard from "../../molecules/MealIdeasCard"; // Adjust the path as needed
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { FaSearch, FaFilter } from "react-icons/fa"; // For search and filter icons

// Styled components for the page layout
const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${colors.brightWhite};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: ${fonts.poppins.weights.bold};
  color: ${colors.primary};
`;

const Title = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 28px;
  color: ${colors.deepSlate};
  text-align: center;
  margin-bottom: 20px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.brightWhite};
  border: 1px solid ${colors.steelGray};
  border-radius: 20px;
  padding: 8px 12px;
  width: 200px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-family: ${fonts.poppins.family};
  font-size: 14px;
  color: ${colors.deepSlate};
  width: 100%;
  background: transparent;

  &::placeholder {
    color: ${colors.steelGray};
  }
`;

const FilterIcon = styled(FaFilter)`
  color: ${colors.steelGray};
  font-size: 18px;
  cursor: pointer;
`;

const SectionTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 22px;
  color: ${colors.deepSlate};
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 columns as shown in the image
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); // Adjust for smaller screens
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

export default function MealIdeas() {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view meal ideas");
        }

        const response = await axios.get(
          process.env.NEXT_PUBLIC_URL + "/recipes/healthy",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPopularRecipes(response.data.popularRecipes);
        setRecommendedRecipes(response.data.recommendedRecipes);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch recipes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <PageContainer>
      {/* Header with Logo, Title, and Search Bar */}
      <Header>
        <Logo>Foodie App</Logo> {/* Replace with your actual logo */}
        <SearchBarContainer>
          <SearchBar>
            <FaSearch style={{ color: colors.steelGray, marginRight: "8px" }} />
            <SearchInput placeholder="Search..." />
          </SearchBar>
          <FilterIcon />
        </SearchBarContainer>
      </Header>

      <Title>Meal Ideas</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage>Loading recipes...</LoadingMessage>}

      {/* Popular Menus Section */}
      <SectionTitle>Popular Menus</SectionTitle>
      <Grid>
        {popularRecipes.map((recipe) => (
          <MealIdeasCard
            key={recipe.id}
            image={recipe.image}
            category={recipe.category || "Healthy"} // Adjust based on your API response
            calories={`${recipe.calories} kcal`}
            carbs={`${recipe.carbs || "20g"}`} // Adjust based on your API response
            protein={`${recipe.protein || "30g"}`} // Adjust based on your API response
            fat={`${recipe.fat || "10g"}`} // Adjust based on your API response
            title={recipe.title}
            description={
              recipe.description ||
              "A healthy and delicious meal option to support weight loss and overall health."
            } // Adjust based on your API response
            onReadMore={() =>
              (window.location.href = `/meal-ideas/${recipe.id}`)
            } // Adjust navigation as needed
            onFavorite={() => console.log("Favorited:", recipe.title)} // Add favorite functionality
          />
        ))}
      </Grid>

      {/* Recommended Menus Section */}
      <SectionTitle>Recommended Menus</SectionTitle>
      <Grid>
        {recommendedRecipes.map((recipe) => (
          <MealIdeasCard
            key={recipe.id}
            image={recipe.image}
            category={recipe.category || "Healthy"} // Adjust based on your API response
            calories={`${recipe.calories} kcal`}
            carbs={`${recipe.carbs || "20g"}`} // Adjust based on your API response
            protein={`${recipe.protein || "30g"}`} // Adjust based on your API response
            fat={`${recipe.fat || "10g"}`} // Adjust based on your API response
            title={recipe.title}
            description={
              recipe.description ||
              "A healthy and delicious meal option to support weight loss and overall health."
            } // Adjust based on your API response
            onReadMore={() =>
              (window.location.href = `/meal-ideas/${recipe.id}`)
            } // Adjust navigation as needed
            onFavorite={() => console.log("Favorited:", recipe.title)} // Add favorite functionality
          />
        ))}
      </Grid>
    </PageContainer>
  );
}

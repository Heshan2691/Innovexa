"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";
import CalorieCard from "../../../atoms/calorie-card";
import { FaClock } from "react-icons/fa";

// Styled components for the page layout
const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${colors.brightWhite};
`;

const HeaderSection = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RecipeTitle = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 28px;
  color: ${colors.brightWhite};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.brightWhite};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.brightWhite};
`;

const SectionTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 20px;
  color: ${colors.deepSlate};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
  margin-bottom: 20px;
`;

const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
  margin-bottom: 5px;
`;

const OrderedList = styled.ol`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const OrderedListItem = styled.li`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
  margin-bottom: 10px;
`;

const NutritionSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: space-between; // Distribute cards evenly

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primary};
  color: ${colors.brightWhite};
  border: none;
  border-radius: 4px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.primaryDark};
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

const NotFoundMessage = styled.p`
  text-align: center;
  color: ${colors.steelGray};
`;

export default function MealIdeaDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view recipe details");
        }

        const response = await axios.get(
          process.env.NEXT_PUBLIC_URL + `/recipes/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRecipe(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch recipe details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  if (loading) return <LoadingMessage>Loading recipe...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!recipe) return <NotFoundMessage>Recipe not found</NotFoundMessage>;

  return (
    <PageContainer>
      {/* Header Section with Image, Title, Time, and Rating */}
      <HeaderSection>
        <RecipeImage src={recipe.image} alt={recipe.title} />
        <HeaderOverlay>
          <TitleContainer>
            <RecipeTitle>{recipe.title}</RecipeTitle>
            <TimeContainer>
              <FaClock />
              {recipe.readyInMinutes} min
            </TimeContainer>
          </TitleContainer>
          <RatingContainer>
            {[...Array(5)].map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </RatingContainer>
        </HeaderOverlay>
      </HeaderSection>

      {/* Description Section */}
      <SectionTitle>Description</SectionTitle>
      <Description>{recipe.description}</Description>

      {/* Ingredients Section */}
      <SectionTitle>Ingredients</SectionTitle>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
        ))}
      </List>

      {/* Optional Toppings Section */}
      {recipe.optionalToppings?.length > 0 && (
        <>
          <SectionTitle>Optional Toppings</SectionTitle>
          <List>
            {recipe.optionalToppings.map((topping, index) => (
              <ListItem key={index}>{topping}</ListItem>
            ))}
          </List>
        </>
      )}

      {/* Instructions Section */}
      <SectionTitle>Instructions</SectionTitle>
      <OrderedList>
        {recipe.instructions.map((step, index) => (
          <OrderedListItem key={index}>{step}</OrderedListItem>
        ))}
      </OrderedList>

      {/* Nutrition Section */}
      <SectionTitle>Nutrition (per serving)</SectionTitle>
      <NutritionSection>
        <CalorieCard
          type="calories"
          value={recipe.nutrition.calories}
          rating={5}
          showRating={true}
          readOnly={true}
        />
        <CalorieCard
          type="carbs"
          value={recipe.nutrition.carbs}
          showRating={false}
        />
        <CalorieCard
          type="protein"
          value={recipe.nutrition.protein}
          showRating={false}
        />
        <CalorieCard
          type="fat"
          value={recipe.nutrition.fats}
          showRating={false}
        />
      </NutritionSection>

      {/* Save to Plan Button */}
      <SaveButton>Save to Plan</SaveButton>
    </PageContainer>
  );
}

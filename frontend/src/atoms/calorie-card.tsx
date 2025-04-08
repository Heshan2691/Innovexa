// components/atoms/NutritionCard.tsx
"use client";

import type React from "react";
import styled from "styled-components";
import { fonts } from "../styles/fonts";
import StarRating from "./star-rating";
import { FaCarrot, FaDrumstickBite, FaTint } from "react-icons/fa";

interface NutritionCardProps {
  value: number;
  type: "calories" | "carbs" | "protein" | "fat";
  rating?: number;
  onRatingChange?: (rating: number) => void;
  showRating?: boolean;
  readOnly?: boolean;
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 180px; // Reduced to fit 4 cards in 800px with gaps
`;

const IconContainer = styled.div<{ type: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => {
    switch (type) {
      case "calories":
        return `background-color: #d3f36b;`;
      case "carbs":
        return `background-color: #E7FBBE;`;
      case "protein":
        return `background-color: #FFDAB9;`;
      case "fat":
        return `background-color: #FFCCCB;`;
      default:
        return `background-color: #d3f36b;`;
    }
  }}
`;

const FlameIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 2 12 2C7.58172 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C14.2091 22 16 20.2091 16 18C16 15.7909 14.2091 14 12 14C9.79086 14 8 15.7909 8 18C8 20.2091 9.79086 22 12 22Z"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`;

const NutritionValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: #1f2937;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const NutritionUnit = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: #6b7280;
`;

const RatingContainer = styled.div`
  margin-top: 4px;
`;

const CalorieCard: React.FC<NutritionCardProps> = ({
  value,
  type,
  rating = 0,
  onRatingChange,
  showRating = false,
  readOnly = false,
}) => {
  const getTitle = () => {
    switch (type) {
      case "calories":
        return "Total Calories";
      case "carbs":
        return "Carbs";
      case "protein":
        return "Protein";
      case "fat":
        return "Fat";
      default:
        return "Total Calories";
    }
  };

  const getUnit = () => {
    return type === "calories" ? "kcal" : "g";
  };

  const getIcon = () => {
    switch (type) {
      case "calories":
        return <FlameIcon />;
      case "carbs":
        return <FaCarrot size={24} color="#333333" />;
      case "protein":
        return <FaDrumstickBite size={24} color="#333333" />;
      case "fat":
        return <FaTint size={24} color="#333333" />;
      default:
        return <FlameIcon />;
    }
  };

  return (
    <CardContainer>
      <IconContainer type={type}>{getIcon()}</IconContainer>

      <ContentContainer>
        <Title>{getTitle()}</Title>
        <NutritionValue>
          {value} <NutritionUnit>{getUnit()}</NutritionUnit>
        </NutritionValue>

        {showRating && (
          <RatingContainer>
            <StarRating
              initialRating={rating}
              onChange={onRatingChange}
              readOnly={readOnly}
            />
          </RatingContainer>
        )}
      </ContentContainer>
    </CardContainer>
  );
};

export default CalorieCard;

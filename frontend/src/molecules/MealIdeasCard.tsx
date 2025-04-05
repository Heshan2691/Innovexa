// components/MealIdeasCard.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import Button from '../atoms/Button';
import { FaCarrot, FaDrumstickBite, FaTint, FaHeart } from 'react-icons/fa';

interface MealIdeasCardProps {
  image: string;
  category: string;
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
  title: string;
  description: string;
  onReadMore: () => void;
  onFavorite: () => void;
}

const Card = styled.div`
  width: 300px;
  background-color: ${colors.brightWhite};
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ImageSection = styled.div`
  position: relative;
  height: 150px;
`;

const MealImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${colors.tertiary};
  color: ${colors.brightWhite};
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const CalorieBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${colors.brightWhite};
  color: ${colors.deepSlate};
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NutritionSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;

const NutritionBadge = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: ${colors.deepSlate};

  ${({ type }) => {
    switch (type) {
      case 'carbs':
        return `background-color: #E7FBBE;`; // Light green
      case 'protein':
        return `background-color: #FFDAB9;`; // Light peach
      case 'fat':
        return `background-color: #FFCCCB;`; // Light pink
      default:
        return `background-color: #E7FBBE;`;
    }
  }}
`;

const ContentSection = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 16px;
  color: ${colors.deepSlate};
`;

const Description = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 15px 15px;
`;

const HeartIcon = styled(FaHeart)`
  color: #EF4444;
  font-size: 20px;
  cursor: pointer;
`;

const MealIdeasCard: React.FC<MealIdeasCardProps> = ({
  image,
  category,
  calories,
  carbs,
  protein,
  fat,
  title,
  description,
  onReadMore,
  onFavorite,
}) => {
  return (
    <Card>
      <ImageSection>
        <MealImage src={image} alt={title} />
        <CategoryBadge>{category}</CategoryBadge>
        <CalorieBadge>
          <FaCarrot /> {calories}
        </CalorieBadge>
      </ImageSection>
      <NutritionSection>
        <NutritionBadge type="carbs">
          <FaCarrot /> C {carbs}
        </NutritionBadge>
        <NutritionBadge type="protein">
          <FaDrumstickBite /> P {protein}
        </NutritionBadge>
        <NutritionBadge type="fat">
          <FaTint /> F {fat}
        </NutritionBadge>
      </NutritionSection>
      <ContentSection>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentSection>
      <FooterSection>
        <Button variant="primary" size="small" onClick={onReadMore}>
          Read More
        </Button>
        <HeartIcon onClick={onFavorite} />
      </FooterSection>
    </Card>
  );
};

export default MealIdeasCard;
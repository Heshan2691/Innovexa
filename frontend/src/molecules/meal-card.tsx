"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"
import EditButton from "../atoms/EditButton"

interface MealCardProps {
  mealType: string
  calories: number
  recommendedCalories: number
  onAddClick?: () => void
  onExpandClick?: () => void
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.brightWhite};
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`

const ColorBar = styled.div`
  width: 6px;
  height: 48px;
  background-color: ${colors.tertiary};
  border-radius: 3px;
  margin-right: 16px;
`

const MealInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const MealTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const MealType = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 20px;
  color: ${colors.tertiary};
  margin: 0;
`

const Calories = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: ${colors.deepSlate};
`

const ExpandButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${colors.deepSlate};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:focus {
    outline: none;
  }
`

const RecommendedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
`

const RecommendedText = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`

const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.tertiary};
`

const MealCard: React.FC<MealCardProps> = ({ mealType, calories, recommendedCalories, onAddClick, onExpandClick }) => {
  return (
    <CardContainer>
      <LeftSection>
        <ColorBar />
        <MealInfo>
          <MealTitle>
            <MealType>{mealType}</MealType>
            <Calories>{calories} Kcal</Calories>
            <ExpandButton onClick={onExpandClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ExpandButton>
          </MealTitle>
          <RecommendedInfo>
            <RecommendedText>Recommended {recommendedCalories} Kcal</RecommendedText>
            <CheckIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CheckIcon>
          </RecommendedInfo>
        </MealInfo>
      </LeftSection>

      <EditButton icon="plus" variant="secondary" size="large" onClick={onAddClick} />
    </CardContainer>
  )
}

export default MealCard


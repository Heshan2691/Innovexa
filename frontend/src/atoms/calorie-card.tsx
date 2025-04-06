"use client"

import type React from "react"
import styled from "styled-components"
import { fonts } from "../styles/fonts"
import StarRating from "./star-rating"

interface CalorieCardProps {
  calories: number
  rating?: number
  onRatingChange?: (rating: number) => void
  title?: string
  showRating?: boolean
  readOnly?: boolean
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
  max-width: 360px;
`

const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: #d3f36b;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FlameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
)

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`

const CalorieValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: #1f2937;
  display: flex;
  align-items: baseline;
  gap: 4px;
`

const CalorieUnit = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: #6b7280;
`

const RatingContainer = styled.div`
  margin-top: 4px;
`

const CalorieCard: React.FC<CalorieCardProps> = ({
  calories,
  rating = 0,
  onRatingChange,
  title = "Total Calories",
  showRating = true,
  readOnly = false,
}) => {
  return (
    <CardContainer>
      <IconContainer>
        <FlameIcon />
      </IconContainer>

      <ContentContainer>
        <Title>{title}</Title>
        <CalorieValue>
          {calories} <CalorieUnit>kcal</CalorieUnit>
        </CalorieValue>

        {showRating && (
          <RatingContainer>
            <StarRating initialRating={rating} onChange={onRatingChange} readOnly={readOnly} />
          </RatingContainer>
        )}
      </ContentContainer>
    </CardContainer>
  )
}

export default CalorieCard


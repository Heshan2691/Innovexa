"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Types for nutrition card
interface NutritionCardProps {
  quality: number
  caloriesConsumed: number
  comparisonText?: string
}

// Styled components for the Nutrition Card
const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 280px;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 18px;
  color: ${colors.deepSlate};
  margin: 0;
`

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const QualityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const QualityLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`

const QualityValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.deepSlate};
  display: flex;
  align-items: center;
  gap: 8px;
`

const QualityCircle = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`

const CaloriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const CaloriesValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.deepSlate};
`

const CaloriesLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`

const ComparisonText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: ${colors.tertiary};
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid ${colors.tertiary};
  }
`

// Nutrition Card component
const NutritionCard: React.FC<NutritionCardProps> = ({
  quality,
  caloriesConsumed,
  comparisonText = "Slightly better than last week",
}) => {
  // Calculate circle path for quality indicator
  const calculateCirclePath = (percentage: number) => {
    const radius = 25
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference
    return {
      circumference,
      offset,
    }
  }

  const { circumference, offset } = calculateCirclePath(quality)

  return (
    <CardContainer>
      <CardHeader>
        <IconContainer>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 8.5V13.5C20 17.5 18 19.5 14 19.5H10C6 19.5 4 17.5 4 13.5V10.5C4 6.5 6 4.5 10 4.5H15"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M16 4.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 8.5H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 2V4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 2V4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 13H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 16H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 10H8.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconContainer>
        <CardTitle>Nutrition</CardTitle>
      </CardHeader>

      <CardContent>
        <QualityContainer>
          <QualityLabel>Quality</QualityLabel>
          <QualityValue>
            <QualityCircle>
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="25" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform="rotate(-90 30 30)"
                />
              </svg>
            </QualityCircle>
            {quality}%
          </QualityValue>
        </QualityContainer>

        <CaloriesContainer>
          <CaloriesValue>{caloriesConsumed}kcal</CaloriesValue>
          <CaloriesLabel>Consumed</CaloriesLabel>
          <ComparisonText>{comparisonText}</ComparisonText>
        </CaloriesContainer>
      </CardContent>
    </CardContainer>
  )
}

export default NutritionCard


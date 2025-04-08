"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Types for calorie summary card
interface CalorieSummaryCardProps {
  caloriesBurned: number
  caloriesAvailable: number
  caloriesEaten: number
  calorieGoal: number
}

// Styled components for the Calorie Summary Card
const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 360px;
`

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CalorieItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const CalorieValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.deepSlate};
`

const CalorieLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #9ca3af;
  text-transform: lowercase;
`

const BurnIcon = styled.div`
  color: #f59e0b;
  font-size: 20px;
  margin-bottom: 4px;
`

const EatenIcon = styled.div`
  color: #6b7280;
  font-size: 20px;
  margin-bottom: 4px;
`

const CircleContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CircleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f3f4f6;
`

const CircleProgress = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`

const CircleText = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`

const AvailableValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.deepSlate};
`

const AvailableLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #9ca3af;
`

const ProgressIndicator = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 16px;
  justify-content: center;
`

const ProgressDot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? colors.tertiary : "#e5e7eb")};
`

const GoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`

const GoalValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.deepSlate};
`

const GoalLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #9ca3af;
`

// Calorie Summary Card component
const CalorieSummaryCard: React.FC<CalorieSummaryCardProps> = ({
  caloriesBurned,
  caloriesAvailable,
  caloriesEaten,
  calorieGoal,
}) => {
  // Calculate percentage for progress circle
  const calculateProgress = () => {
    // Removed unused variable 'total'
    const percentage = (caloriesAvailable / calorieGoal) * 100
    return Math.min(percentage, 100)
  }

  const progress = calculateProgress()

  // Calculate circle path
  const calculateCirclePath = (percentage: number) => {
    const radius = 54
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference
    return {
      circumference,
      offset,
    }
  }

  const { circumference, offset } = calculateCirclePath(progress)

  // Determine progress color
  const getProgressColor = () => {
    if (progress < 30) return "#ef4444" // Red for low
    if (progress < 70) return "#f59e0b" // Yellow for medium
    return "#10b981" // Green for good
  }

  return (
    <CardContainer>
      <CardContent>
        <CalorieItem>
          <BurnIcon>🔥</BurnIcon>
          <CalorieValue>{caloriesBurned}</CalorieValue>
          <CalorieLabel>burn</CalorieLabel>
        </CalorieItem>

        <CircleContainer>
          <CircleBackground />
          <CircleProgress viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={getProgressColor()}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </CircleProgress>
          <CircleText>
            <AvailableValue>{caloriesAvailable}</AvailableValue>
            <AvailableLabel>kcal available</AvailableLabel>
          </CircleText>
          <ProgressIndicator>
            <ProgressDot $active={true} />
            <ProgressDot $active={false} />
          </ProgressIndicator>
        </CircleContainer>

        <CalorieItem>
          <EatenIcon>✕</EatenIcon>
          <CalorieValue>{caloriesEaten}</CalorieValue>
          <CalorieLabel>eaten</CalorieLabel>
        </CalorieItem>
      </CardContent>

      <GoalContainer>
        <GoalValue>{calorieGoal}</GoalValue>
        <GoalLabel>Kcal Goal</GoalLabel>
      </GoalContainer>
    </CardContainer>
  )
}

export default CalorieSummaryCard


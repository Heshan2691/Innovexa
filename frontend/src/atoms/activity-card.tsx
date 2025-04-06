"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Types for activity card
export type ActivityType = "sleep" | "steps" | "calories"

interface ActivityCardProps {
  type: ActivityType
  value: number
  unit?: string
  label?: string
  icon?: React.ReactNode
  iconColor?: string
  onValueChange?: (value: number) => void
}

// Styled components for the Activity Card
const CardContainer = styled.div`
  width: 100%;
  max-width: 180px;
`

const CardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: #000000;
  margin: 0 0 12px 0;
`

const CardContent = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #9ca3af;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #d1d5db;
  }
`

const IconContainer = styled.div<{ $color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.$color || "#00AEEF"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`

const ValueText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 18px;
  color: #4b5563;
  text-align: center;
`

const LabelText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`

// Icons for different activity types
const SleepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 8.00001C16.5523 8.00001 17 7.55229 17 7.00001C17 6.44772 16.5523 6.00001 16 6.00001C15.4477 6.00001 15 6.44772 15 7.00001C15 7.55229 15.4477 8.00001 16 8.00001Z"
      fill="white"
    />
    <path
      d="M14 4.00001C14.5523 4.00001 15 3.5523 15 3.00001C15 2.44772 14.5523 2.00001 14 2.00001C13.4477 2.00001 13 2.44772 13 3.00001C13 3.5523 13.4477 4.00001 14 4.00001Z"
      fill="white"
    />
    <path
      d="M11 3.00001C11.5523 3.00001 12 2.5523 12 2.00001C12 1.44772 11.5523 1.00001 11 1.00001C10.4477 1.00001 10 1.44772 10 2.00001C10 2.5523 10.4477 3.00001 11 3.00001Z"
      fill="white"
    />
    <path
      d="M8.00001 4.00001C8.5523 4.00001 9.00001 3.5523 9.00001 3.00001C9.00001 2.44772 8.5523 2.00001 8.00001 2.00001C7.44772 2.00001 7.00001 2.44772 7.00001 3.00001C7.00001 3.5523 7.44772 4.00001 8.00001 4.00001Z"
      fill="white"
    />
    <path
      d="M6.00001 8.00001C6.5523 8.00001 7.00001 7.55229 7.00001 7.00001C7.00001 6.44772 6.5523 6.00001 6.00001 6.00001C5.44772 6.00001 5.00001 6.44772 5.00001 7.00001C5.00001 7.55229 5.44772 8.00001 6.00001 8.00001Z"
      fill="white"
    />
    <path
      d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
      fill="white"
    />
  </svg>
)

const StepsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.5 6C13.5 7.38071 12.3807 8.5 11 8.5C9.61929 8.5 8.5 7.38071 8.5 6C8.5 4.61929 9.61929 3.5 11 3.5C12.3807 3.5 13.5 4.61929 13.5 6Z"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M13.5 18C13.5 19.3807 12.3807 20.5 11 20.5C9.61929 20.5 8.5 19.3807 8.5 18C8.5 16.6193 9.61929 15.5 11 15.5C12.3807 15.5 13.5 16.6193 13.5 18Z"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
)

const CaloriesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2Z"
      fill="white"
    />
    <path
      d="M15 10.5C15 9.11929 13.6569 8 12 8C10.3431 8 9 9.11929 9 10.5C9 11.8807 10.3431 13 12 13C13.6569 13 15 11.8807 15 10.5Z"
      fill="white"
    />
    <path
      d="M15 16C15 14.6193 13.6569 13.5 12 13.5C10.3431 13.5 9 14.6193 9 16C9 17.3807 10.3431 18.5 12 18.5C13.6569 18.5 15 17.3807 15 16Z"
      fill="white"
    />
    <path
      d="M15 21.5C15 20.1193 13.6569 19 12 19C10.3431 19 9 20.1193 9 21.5C9 22.8807 10.3431 24 12 24C13.6569 24 15 22.8807 15 21.5Z"
      fill="white"
    />
  </svg>
)

// Activity Card component
const ActivityCard: React.FC<ActivityCardProps> = ({
  type,
  value,
  unit = "",
  label,
  icon,
  iconColor,
  onValueChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value)

  // Default labels and icons based on type
  const getDefaultLabel = () => {
    switch (type) {
      case "sleep":
        return "Sleeping Time"
      case "steps":
        return "Steps Count"
      case "calories":
        return "Burn"
      default:
        return ""
    }
  }

  const getDefaultIcon = () => {
    switch (type) {
      case "sleep":
        return <SleepIcon />
      case "steps":
        return <StepsIcon />
      case "calories":
        return <CaloriesIcon />
      default:
        return null
    }
  }

  const getDefaultColor = () => {
    switch (type) {
      case "sleep":
        return "#00AEEF"
      case "steps":
        return "#00AEEF"
      case "calories":
        return "#00AEEF"
      default:
        return "#00AEEF"
    }
  }

  const getDefaultUnit = () => {
    switch (type) {
      case "sleep":
        return "h"
      case "steps":
        return ""
      case "calories":
        return ""
      default:
        return ""
    }
  }

  const getIncrementValue = () => {
    switch (type) {
      case "sleep":
        return 0.5
      case "steps":
        return 500
      case "calories":
        return 50
      default:
        return 1
    }
  }

  const handleIncrement = () => {
    const increment = getIncrementValue()
    const newValue = currentValue + increment
    setCurrentValue(newValue)
    if (onValueChange) onValueChange(newValue)
  }

  const handleDecrement = () => {
    const increment = getIncrementValue()
    const newValue = Math.max(currentValue - increment, 0)
    setCurrentValue(newValue)
    if (onValueChange) onValueChange(newValue)
  }

  const displayValue = type === "sleep" ? currentValue.toFixed(1).replace(/\.0$/, "") : Math.round(currentValue)
  const displayUnit = unit || getDefaultUnit()
  const displayLabel = label || getDefaultLabel()
  const displayIcon = icon || getDefaultIcon()
  const displayColor = iconColor || getDefaultColor()

  return (
    <CardContainer>
      <CardTitle>{type === "sleep" ? "Sleep Time" : type === "steps" ? "Steps Count" : "Burnt Calories"}</CardTitle>
      <CardContent>
        <ControlsRow>
          <ControlButton onClick={handleDecrement}>−</ControlButton>
          <IconContainer $color={displayColor}>{displayIcon}</IconContainer>
          <ControlButton onClick={handleIncrement}>+</ControlButton>
        </ControlsRow>
        <div>
          <ValueText>
            {displayValue}
            {displayUnit}
          </ValueText>
          <LabelText>{displayLabel}</LabelText>
        </div>
      </CardContent>
    </CardContainer>
  )
}

export default ActivityCard


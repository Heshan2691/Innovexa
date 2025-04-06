"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Styled components for the Water Intake Card
const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px;
  width: 100%;
  max-width: 500px;
  position: relative;
`

const CardLabel = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: #d8b4fe; /* Light purple color for the card label */
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: #d8b4fe;
    border-radius: 50%;
  }
`

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const WaterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const WaterLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 24px;
  color: ${colors.deepSlate};
`

const WaterAmount = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 48px;
  color: ${colors.deepSlate};
  display: flex;
  align-items: baseline;
  gap: 8px;
`

const WaterGoal = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 24px;
  color: #9ca3af;
`

const LastTime = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: #9ca3af;
  margin-top: 16px;
`

const WaterVisualization = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const ControlButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${colors.deepSlate};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #d1d5db;
  }
`

const WaterLevelContainer = styled.div`
  width: 80px;
  height: 160px;
  background-color: #e5e7eb;
  border-radius: 40px;
  position: relative;
  overflow: hidden;
`

const WaterLevel = styled.div<{ $percentage: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.$percentage}%;
  background: linear-gradient(180deg, #7dd3fc 0%, #60a5fa 100%);
  border-radius: 40px;
  transition: height 0.5s ease;
`

const WaterPercentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: ${colors.deepSlate};
  z-index: 1;
`

interface WaterIntakeCardProps {
  currentAmount?: number // in liters
  goalAmount?: number // in liters
  lastTime?: string
  showLabel?: boolean
  onAmountChange?: (amount: number) => void
}

const WaterIntakeCard: React.FC<WaterIntakeCardProps> = ({
  currentAmount = 1.9,
  goalAmount = 2.5,
  lastTime = "10:45 AM",
  showLabel = true,
  onAmountChange,
}) => {
  const [amount, setAmount] = useState(currentAmount)

  const percentage = Math.min(Math.round((amount / goalAmount) * 100), 100)

  const handleIncrement = () => {
    const newAmount = Math.min(amount + 0.1, goalAmount * 1.5)
    setAmount(Number.parseFloat(newAmount.toFixed(1)))
    if (onAmountChange) onAmountChange(newAmount)
  }

  const handleDecrement = () => {
    const newAmount = Math.max(amount - 0.1, 0)
    setAmount(Number.parseFloat(newAmount.toFixed(1)))
    if (onAmountChange) onAmountChange(newAmount)
  }

  return (
    <CardContainer>
      {showLabel && <CardLabel>Water Intake</CardLabel>}

      <CardContent>
        <WaterInfo>
          <WaterLabel>Water</WaterLabel>
          <WaterAmount>
            {amount} <WaterGoal>/ {goalAmount}L</WaterGoal>
          </WaterAmount>
          <LastTime>Last time {lastTime}</LastTime>
        </WaterInfo>

        <WaterVisualization>
          <ControlButton onClick={handleDecrement}>−</ControlButton>
          <WaterLevelContainer>
            <WaterLevel $percentage={percentage} />
            <WaterPercentage>{percentage}%</WaterPercentage>
          </WaterLevelContainer>
          <ControlButton onClick={handleIncrement}>+</ControlButton>
        </WaterVisualization>
      </CardContent>
    </CardContainer>
  )
}

export default WaterIntakeCard


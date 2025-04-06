"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

interface BMISimpleCardProps {
  bmi: number
  weight: number
  height: number
  age: number
  gender: string
  healthyWeightRange: {
    min: number
    max: number
  }
}

const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: ${colors.deepSlate};
  margin: 0 0 16px 0;
  text-align: center;
`

const BMIValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 40px;
  color: ${colors.tertiary};
  margin-bottom: 16px;
`

const BMICategory = styled.div`
  background-color: ${colors.tertiary};
  color: white;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 16px;
  margin-bottom: 24px;
`

const BMIScale = styled.div`
  width: 100%;
  height: 12px;
  background: linear-gradient(
    to right,
    #06B6D4 0%,
    #06B6D4 33%,
    #FACC15 33%,
    #FACC15 66%,
    #EF4444 66%,
    #EF4444 100%
  );
  border-radius: 6px;
  margin-bottom: 24px;
  position: relative;
`

const BMIIndicator = styled.div<{ $position: number }>`
  position: absolute;
  top: -4px;
  left: ${(props) => props.$position}%;
  width: 20px;
  height: 20px;
  background-color: white;
  border: 2px solid ${colors.tertiary};
  border-radius: 50%;
  transform: translateX(-50%);
`

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const StatValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 18px;
  color: ${colors.deepSlate};
`

const StatLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #6b7280;
`

const HealthyWeightText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: ${colors.deepSlate};
  text-align: center;
  margin-bottom: 8px;
`

const HealthyWeightRange = styled.span`
  font-weight: ${fonts.poppins.weights.bold};
  color: ${colors.tertiary};
`

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

const getBMIColor = (bmi: number) => {
  if (bmi < 18.5) return "#06B6D4" // Blue for underweight
  if (bmi < 25) return "#10B981" // Green for normal
  if (bmi < 30) return "#FACC15" // Yellow for overweight
  return "#EF4444" // Red for obese
}

const getBMIPosition = (bmi: number) => {
  if (bmi < 16) return 0
  if (bmi > 35) return 100
  // Map BMI 16-35 to 0-100%
  return ((bmi - 16) / 19) * 100
}

const BMISimpleCard: React.FC<BMISimpleCardProps> = ({ bmi, weight, height, age, gender, healthyWeightRange }) => {
  const category = getBMICategory(bmi)
  const color = getBMIColor(bmi)
  const position = getBMIPosition(bmi)

  return (
    <CardContainer>
      <CardTitle>Your BMI</CardTitle>

      <BMIValue style={{ color }}>{bmi.toFixed(1)}</BMIValue>

      <BMICategory style={{ backgroundColor: color }}>{category}</BMICategory>

      <BMIScale>
        <BMIIndicator $position={position} style={{ borderColor: color }} />
      </BMIScale>

      <StatsContainer>
        <StatItem>
          <StatValue>{weight}</StatValue>
          <StatLabel>weight</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{height}</StatValue>
          <StatLabel>height</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{age}</StatValue>
          <StatLabel>Age</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{gender}</StatValue>
          <StatLabel>Gender</StatLabel>
        </StatItem>
      </StatsContainer>

      <HealthyWeightText>
        Healthy weight for the height:{" "}
        <HealthyWeightRange>
          {healthyWeightRange.min} kg - {healthyWeightRange.max} kg
        </HealthyWeightRange>
      </HealthyWeightText>
    </CardContainer>
  )
}

export default BMISimpleCard


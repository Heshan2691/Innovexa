"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

interface DayData {
  day: string
  consumed: number
  burned: number
}

interface CaloriesActivitiesCardProps {
  caloriesLeft: number
  calorieGoal: number
  daysData: DayData[]
  onPeriodChange?: (period: string) => void
}

const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 600px;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: ${colors.deepSlate};
  margin: 0;
`

const CaloriesInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const CaloriesLeft = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 18px;
  color: ${colors.deepSlate};
`

const CalorieGoal = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`

const PeriodSelector = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #00AEEF;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #0096cc;
  }
`

const ChartContainer = styled.div`
  margin-top: 24px;
  height: 240px;
  position: relative;
`

const ChartLegend = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`

const LegendDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
`

const BarChart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
`

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 40px;
`

const BarContainer = styled.div`
  display: flex;
  gap: 4px;
  height: 160px;
  align-items: flex-end;
  width: 100%;
`

const Bar = styled.div<{ $height: number; $color: string }>`
  width: 48%;
  height: ${(props) => props.$height}%;
  background-color: ${(props) => props.$color};
  border-radius: 4px 4px 0 0;
  position: relative;
  
  &:hover::after {
    content: attr(data-value);
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #374151;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
  }
`

const DayLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #6b7280;
`

const CaloriesActivitiesCard: React.FC<CaloriesActivitiesCardProps> = ({
  caloriesLeft,
  calorieGoal,
  daysData,
  onPeriodChange,
}) => {
  const [period, setPeriod] = useState("Last 7 Days")

  const handlePeriodChange = () => {
    const newPeriod = period === "Last 7 Days" ? "Last 30 Days" : "Last 7 Days"
    setPeriod(newPeriod)
    if (onPeriodChange) onPeriodChange(newPeriod)
  }

  // Find max value for scaling
  const maxValue = Math.max(...daysData.flatMap((d) => [d.consumed, d.burned]))

  // Calculate bar heights as percentages
  const calculateHeight = (value: number) => {
    return (value / maxValue) * 100
  }

  return (
    <CardContainer>
      <CardHeader>
        <HeaderLeft>
          <CardTitle>Calories Activities</CardTitle>
          <CaloriesInfo>
            <CaloriesLeft>{caloriesLeft} kcal left</CaloriesLeft>
            <CalorieGoal>Calorie Goal: {calorieGoal} kcal</CalorieGoal>
          </CaloriesInfo>
        </HeaderLeft>

        <PeriodSelector onClick={handlePeriodChange}>
          {period}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PeriodSelector>
      </CardHeader>

      <ChartLegend>
        <LegendItem>
          <LegendDot $color="#1E3A8A" />
          Consumed
        </LegendItem>
        <LegendItem>
          <LegendDot $color="#00AEEF" />
          Burned
        </LegendItem>
      </ChartLegend>

      <ChartContainer>
        <BarChart>
          {daysData.map((day, index) => (
            <BarGroup key={index}>
              <BarContainer>
                <Bar $height={calculateHeight(day.consumed)} $color="#1E3A8A" data-value={`${day.consumed} kcal`} />
                <Bar $height={calculateHeight(day.burned)} $color="#00AEEF" data-value={`${day.burned} kcal`} />
              </BarContainer>
              <DayLabel>{day.day}</DayLabel>
            </BarGroup>
          ))}
        </BarChart>
      </ChartContainer>
    </CardContainer>
  )
}

export default CaloriesActivitiesCard


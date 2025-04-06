"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

interface DayData {
  day: string
  protein: number
  carbs: number
  fats: number
}

interface ActivityGrowthCardProps {
  monthYear: string
  daysData: DayData[]
  onMonthChange?: (month: string) => void
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
  align-items: center;
  margin-bottom: 24px;
`

const CardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: ${colors.deepSlate};
  margin: 0;
`

const MonthSelector = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  color: ${colors.deepSlate};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #d1d5db;
  }
`

const ChartContainer = styled.div`
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
  overflow-x: auto;
  padding-bottom: 16px;
`

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 30px;
  margin: 0 4px;
`

const BarContainer = styled.div`
  display: flex;
  gap: 2px;
  height: 160px;
  align-items: flex-end;
  width: 100%;
`

const Bar = styled.div<{ $height: number; $color: string }>`
  width: 6px;
  height: ${(props) => props.$height}%;
  background-color: ${(props) => props.$color};
  border-radius: 2px 2px 0 0;
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
  font-size: 10px;
  color: #6b7280;
  transform: rotate(-45deg);
  transform-origin: top left;
  white-space: nowrap;
`

const YAxisLabels = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 8px;
`

const YAxisLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #6b7280;
  text-align: right;
`

const ActivityGrowthCard: React.FC<ActivityGrowthCardProps> = ({ monthYear, daysData, onMonthChange }) => {
  const [month, setMonth] = useState(monthYear)

  const handleMonthChange = () => {
    // In a real app, this would open a date picker
    const newMonth = month === "Jan 2025" ? "Feb 2025" : "Jan 2025"
    setMonth(newMonth)
    if (onMonthChange) onMonthChange(newMonth)
  }

  // Find max value for scaling
  const maxValue = Math.max(...daysData.flatMap((d) => [d.protein, d.carbs, d.fats]))

  // Calculate bar heights as percentages
  const calculateHeight = (value: number) => {
    return (value / maxValue) * 100
  }

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>Activity Growth</CardTitle>
        <MonthSelector onClick={handleMonthChange}>
          {month}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MonthSelector>
      </CardHeader>

      <ChartLegend>
        <LegendItem>
          <LegendDot $color="#9F1239" />
          Protein
        </LegendItem>
        <LegendItem>
          <LegendDot $color="#0E7490" />
          Carbs
        </LegendItem>
        <LegendItem>
          <LegendDot $color="#D97706" />
          Fats
        </LegendItem>
      </ChartLegend>

      <ChartContainer>
        <YAxisLabels>
          <YAxisLabel>80%</YAxisLabel>
          <YAxisLabel>60%</YAxisLabel>
          <YAxisLabel>40%</YAxisLabel>
          <YAxisLabel>20%</YAxisLabel>
          <YAxisLabel>0%</YAxisLabel>
        </YAxisLabels>

        <BarChart>
          {daysData.map((day, index) => (
            <BarGroup key={index}>
              <BarContainer>
                <Bar $height={calculateHeight(day.protein)} $color="#9F1239" data-value={`${day.protein}%`} />
                <Bar $height={calculateHeight(day.carbs)} $color="#0E7490" data-value={`${day.carbs}%`} />
                <Bar $height={calculateHeight(day.fats)} $color="#D97706" data-value={`${day.fats}%`} />
              </BarContainer>
              <DayLabel>{day.day}</DayLabel>
            </BarGroup>
          ))}
        </BarChart>
      </ChartContainer>
    </CardContainer>
  )
}

export default ActivityGrowthCard


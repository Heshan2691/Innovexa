"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"
import EditButton from "../atoms/EditButton"

interface WeightData {
  month: string
  weight: number
}

interface WeightTrackingCardProps {
  startWeight: number
  currentWeight: number
  goalWeight: number
  weightData: WeightData[]
  onEditClick?: () => void
}

const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 360px;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const CardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: ${colors.deepSlate};
  margin: 0;
`

const WeightInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`

const WeightInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const WeightLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6b7280;
`

const WeightValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.deepSlate};
  display: flex;
  align-items: baseline;
  gap: 4px;
`

const WeightUnit = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  color: #6b7280;
`

const ChartContainer = styled.div`
  position: relative;
  height: 160px;
  margin-bottom: 8px;
`

const ChartBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(180deg, rgba(0, 174, 239, 0.1) 0%, rgba(0, 174, 239, 0.02) 100%);
  border-radius: 8px;
`

const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`

const MonthsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

const Month = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #6b7280;
`

const WeightTrackingCard: React.FC<WeightTrackingCardProps> = ({
  startWeight,
  currentWeight,
  goalWeight,
  weightData,
  onEditClick,
}) => {
  // Calculate chart dimensions
  const chartHeight = 160
  const chartWidth = 100 // percentage
  const maxWeight = Math.max(...weightData.map((d) => d.weight), startWeight)
  const minWeight = Math.min(...weightData.map((d) => d.weight), goalWeight)
  const range = maxWeight - minWeight + 5 // Add padding

  // Generate path for the chart line
  const generatePath = () => {
    if (weightData.length === 0) return ""

    const points = weightData.map((d, i) => {
      const x = (i / (weightData.length - 1)) * chartWidth
      const y = chartHeight - ((d.weight - minWeight) / range) * chartHeight * 0.7
      return `${x},${y}`
    })

    return `M ${points.join(" L ")}`
  }

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>Weight Tracking</CardTitle>
        <EditButton icon="dots" variant="ghost" size="small" onClick={onEditClick} />
      </CardHeader>

      <WeightInfoGrid>
        <WeightInfoItem>
          <WeightLabel>Start Weight</WeightLabel>
          <WeightValue>
            {startWeight} <WeightUnit>Kg</WeightUnit>
          </WeightValue>
        </WeightInfoItem>
        <WeightInfoItem>
          <WeightLabel>Current Weight</WeightLabel>
          <WeightValue>
            {currentWeight} <WeightUnit>Kg</WeightUnit>
          </WeightValue>
        </WeightInfoItem>
        <WeightInfoItem>
          <WeightLabel>Weight Goal</WeightLabel>
          <WeightValue>
            {goalWeight} <WeightUnit>Kg</WeightUnit>
          </WeightValue>
        </WeightInfoItem>
      </WeightInfoGrid>

      <ChartContainer>
        <ChartBackground />
        <ChartSvg viewBox={`0 0 100 ${chartHeight}`} preserveAspectRatio="none">
          {/* Chart line */}
          <path d={generatePath()} stroke="#00AEEF" strokeWidth="2" fill="none" />

          {/* Data points */}
          {weightData.map((d, i) => {
            const x = (i / (weightData.length - 1)) * chartWidth
            const y = chartHeight - ((d.weight - minWeight) / range) * chartHeight * 0.7
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#00AEEF" stroke="white" strokeWidth="2" />
                <text x={x} y={y - 10} fontSize="8" textAnchor="middle" fill="#6b7280">
                  {d.weight} kg
                </text>
              </g>
            )
          })}
        </ChartSvg>
      </ChartContainer>

      <MonthsContainer>
        {weightData.map((d, i) => (
          <Month key={i}>{d.month}</Month>
        ))}
      </MonthsContainer>
    </CardContainer>
  )
}

export default WeightTrackingCard


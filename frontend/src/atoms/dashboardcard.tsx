"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Styled components for the Sleep Analysis Card
const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 320px;
  position: relative;
`

const CardLabel = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: #c084fc; /* Purple color for the dashboard card label */
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: #c084fc;
    border-radius: 50%;
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`

const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  background-color: #FFC107; /* Yellow color for sleep icon */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: white;
`

const CardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 20px;
  color: #1A2526; /* Using deepSlate color */
  margin: 0;
`

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const QualityContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const QualityLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: #6B7280; /* Using steelGray color */
  text-align: center;
  margin-bottom: 4px;
`

const QualityValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: #1A2526; /* Using deepSlate color */
  text-align: center;
`

const CircleBackground = styled.circle`
  fill: none;
  stroke: #E5E7EB;
`

const CircleProgress = styled.circle`
  fill: none;
  stroke: #06B6D4; /* Cyan color for progress */
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease;
`

const DurationContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DurationValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 28px;
  color: #1A2526; /* Using deepSlate color */
  margin-bottom: 4px;
`

const DurationLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: #6B7280; /* Using steelGray color */
  margin-bottom: 8px;
`

const ComparisonText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #10B981; /* Green color for positive comparison */
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
    border-bottom: 6px solid #10B981;
  }
`

interface SleepAnalysisCardProps {
  quality: number // Sleep quality percentage (0-100)
  duration: {
    hours: number
    minutes: number
  }
  comparison?: string // Comparison text with previous day
  showLabel?: boolean // Whether to show the "Dashboard card" label
}

const SleepAnalysisCard: React.FC<SleepAnalysisCardProps> = ({
  quality,
  duration,
  comparison = "Slightly better than yesterday",
  showLabel = true,
}) => {
  // Calculate the stroke-dashoffset for the progress circle
  const calculateCircleProgress = (percent: number) => {
    const radius = 50
    const circumference = 2 * Math.PI * radius
    return circumference - (percent / 100) * circumference
  }

  return (
    <CardContainer>
      {showLabel && <CardLabel>Dashboard card</CardLabel>}

      <CardHeader>
        <IconContainer>
          z<sup>z</sup>z
        </IconContainer>
        <CardTitle>Sleep Analysis</CardTitle>
      </CardHeader>

      <CardContent>
        <QualityContainer>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <CircleBackground cx="60" cy="60" r="50" strokeWidth="12" />
            <CircleProgress
              cx="60"
              cy="60"
              r="50"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 50}
              strokeDashoffset={calculateCircleProgress(quality)}
            />
          </svg>
          <div style={{ position: "absolute" }}>
            <QualityLabel>Quality</QualityLabel>
            <QualityValue>{quality.toFixed(1)} %</QualityValue>
          </div>
        </QualityContainer>

        <DurationContainer>
          <DurationValue>{`${duration.hours}h ${duration.minutes}m`}</DurationValue>
          <DurationLabel>Sleep Duration</DurationLabel>
          <ComparisonText>{comparison}</ComparisonText>
        </DurationContainer>
      </CardContent>
    </CardContainer>
  )
}

export default SleepAnalysisCard


// components/TaskProgressCard.tsx
"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Styled components for the Task Card
const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 320px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const TaskText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 18px;
  color: #1A2526; /* Using deepSlate color */
  line-height: 1.3;
`

const ViewTaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  border: 1px solid #06B6D4; /* Cyan color for button border */
  border-radius: 8px;
  padding: 8px 16px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  color: #06B6D4; /* Cyan color for button text */
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(6, 182, 212, 0.05);
  }
`

const ProgressContainer = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProgressValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 18px;
  color: #1A2526; /* Using deepSlate color */
  position: absolute;
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

interface TaskCardProps {
  progress: number // Task progress percentage (0-100)
  taskText?: string // Task description text
  buttonText?: string // Text for the view task button
  onViewTask?: () => void // Function to call when view task button is clicked
  showLabel?: boolean // Whether to show the "View Task Card" label
}

const TaskCard: React.FC<TaskCardProps> = ({
  progress,
  taskText = "Your today's task almost done!",
  buttonText = "View Task",
  onViewTask = () => {},
  showLabel = true,
}) => {
  // Calculate the stroke-dashoffset for the progress circle
  const calculateCircleProgress = (percent: number) => {
    const radius = 30
    const circumference = 2 * Math.PI * radius
    return circumference - (percent / 100) * circumference
  }

  return (
    <CardContainer>
      {showLabel && <CardLabel>View Task Card</CardLabel>}

      <ContentContainer>
        <TaskText>{taskText}</TaskText>
        <ViewTaskButton onClick={onViewTask}>
          {buttonText} <span>→</span>
        </ViewTaskButton>
      </ContentContainer>

      <ProgressContainer>
        <svg width="70" height="70" viewBox="0 0 70 70">
          <CircleBackground cx="35" cy="35" r="30" strokeWidth="6" />
          <CircleProgress
            cx="35"
            cy="35"
            r="30"
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 30}
            strokeDashoffset={calculateCircleProgress(progress)}
          />
        </svg>
        <ProgressValue>{progress}%</ProgressValue>
      </ProgressContainer>
    </CardContainer>
  )
}

export default TaskCard


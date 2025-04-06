"use client"

import type React from "react"
import styled from "styled-components"
import { fonts } from "../styles/fonts"

interface TipCardProps {
  tip: string
  backgroundColor?: string
  textColor?: string
  icon?: React.ReactNode
}

const CardContainer = styled.div<{ $backgroundColor?: string }>`
  background-color: ${(props) => props.$backgroundColor || "#00AEEF"};
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const TipText = styled.p<{ $textColor?: string }>`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  color: ${(props) => props.$textColor || "white"};
  margin: 0;
  flex: 1;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`

const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.66347 17H14.3364"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 14.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M8.5 10.5C8.5 12.5 10 14 12 14.5C14 15 15.5 13.5 15.5 11.5C15.5 9.5 14 7 12 7C10 7 8.5 8.5 8.5 10.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TipCard: React.FC<TipCardProps> = ({ tip, backgroundColor, textColor, icon }) => {
  return (
    <CardContainer $backgroundColor={backgroundColor}>
      {icon ? (
        <IconContainer>{icon}</IconContainer>
      ) : (
        <IconContainer>
          <LightbulbIcon />
        </IconContainer>
      )}
      <TipText $textColor={textColor}>{tip}</TipText>
    </CardContainer>
  )
}

export default TipCard



"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

interface AvatarProps {
  children?: React.ReactNode
  size?: "small" | "medium" | "large"
  backgroundColor?: string
  textColor?: string
}

const AvatarContainer = styled.div<AvatarProps>`

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  background-color: ${(props) => props.backgroundColor || colors.secondary};
  color: ${(props) => props.textColor || colors.brightWhite};
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};

  ${(props) =>
    props.size === "small" &&
    `
    width: 24px;
    height: 24px;
    font-size: 12px;
  `}

  ${(props) =>
    props.size === "medium" &&
    `
    width: 32px;
    height: 32px;
    font-size: 16px;
  `}

  ${(props) =>
    props.size === "large" &&
    `
    width: 48px;
    height: 48px;
    font-size: 20px;
  `}
`

const Avatar: React.FC<AvatarProps> = ({ children, size = "medium", backgroundColor, textColor }) => {
  return (
    <AvatarContainer size={size} backgroundColor={backgroundColor} textColor={textColor}>
      {children}
    </AvatarContainer>
  )
}

export default Avatar



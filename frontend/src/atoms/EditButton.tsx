"use client"

import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"

interface EditButtonProps {
  size?: "small" | "medium" | "large"
  variant?: "primary" | "secondary" | "ghost"
  onClick?: () => void
  children?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

const StyledButton = styled.button<Omit<EditButtonProps, "onClick" | "children" | "icon">>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  /* Size variants */
  ${(props) =>
    props.size === "small" &&
    `
    width: 28px;
    height: 28px;
    font-size: 14px;
  `}
  
  ${(props) =>
    props.size === "medium" &&
    `
    width: 36px;
    height: 36px;
    font-size: 18px;
  `}
  
  ${(props) =>
    props.size === "large" &&
    `
    width: 48px;
    height: 48px;
    font-size: 24px;
  `}
  
  /* Variant styles */
  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: ${colors.primary};
    color: white;
    
    &:hover {
      background-color: ${colors.tertiary};
    }
  `}
  
  ${(props) =>
    props.variant === "secondary" &&
    `
    background-color: ${colors.secondary};
    color: white;
    
    &:hover {
      background-color: ${colors.primary};
    }
  `}
  
  ${(props) =>
    props.variant === "ghost" &&
    `
    background-color: #e5e7eb;
    color: #6b7280;
    
    &:hover {
      background-color: #d1d5db;
    }
  `}
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.2);
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

const EditIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PlusIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DotsIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const EditButton: React.FC<EditButtonProps> = ({
  size = "medium",
  variant = "primary",
  onClick,
  children,
  icon = "edit",
  className,
}) => {
  const renderIcon = () => {
    if (children) return children

    switch (icon) {
      case "edit":
        return <EditIcon />
      case "plus":
        return <PlusIcon />
      case "dots":
        return <DotsIcon />
      default:
        if (React.isValidElement(icon)) return icon
        return <EditIcon />
    }
  }

  return (
    <StyledButton size={size} variant={variant} onClick={onClick} className={className}>
      <IconWrapper>{renderIcon()}</IconWrapper>
    </StyledButton>
  )
}

export default EditButton


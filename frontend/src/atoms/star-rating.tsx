"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"

interface StarRatingProps {
  initialRating?: number
  maxRating?: number
  size?: "small" | "medium" | "large"
  color?: string
  inactiveColor?: string
  onChange?: (rating: number) => void
  readOnly?: boolean
}

const RatingContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

const StarIcon = styled.button<{
  $active: boolean
  $size: string
  $activeColor: string
  $inactiveColor: string
  $readOnly: boolean
}>`
  background: none;
  border: none;
  padding: 0;
  cursor: ${(props) => (props.$readOnly ? "default" : "pointer")};
  color: ${(props) => (props.$active ? props.$activeColor : props.$inactiveColor)};
  width: ${(props) => (props.$size === "small" ? "16px" : props.$size === "large" ? "24px" : "20px")};
  height: ${(props) => (props.$size === "small" ? "16px" : props.$size === "large" ? "24px" : "20px")};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${(props) => (props.$readOnly ? (props.$active ? props.$activeColor : props.$inactiveColor) : props.$activeColor)};
  }
  
  &:focus {
    outline: none;
  }
`

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  maxRating = 5,
  size = "medium",
  color = "#FACC15", // Yellow color
  inactiveColor = "#D1D5DB", // Gray color
  onChange,
  readOnly = false,
}) => {
  const [rating, setRating] = useState(initialRating)

  const handleRatingChange = (newRating: number) => {
    if (readOnly) return

    setRating(newRating)
    if (onChange) {
      onChange(newRating)
    }
  }

  return (
    <RatingContainer>
      {Array.from({ length: maxRating }).map((_, index) => (
        <StarIcon
          key={index}
          $active={index < rating}
          $size={size}
          $activeColor={color}
          $inactiveColor={inactiveColor}
          $readOnly={readOnly}
          onClick={() => handleRatingChange(index + 1)}
          aria-label={`Rate ${index + 1} of ${maxRating}`}
          type="button"
        >
          <svg width="100%" height="100%" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99984 1.66675L12.5748 6.88341L18.3332 7.72508L14.1665 11.7834L15.1498 17.5167L9.99984 14.8084L4.84984 17.5167L5.83317 11.7834L1.6665 7.72508L7.42484 6.88341L9.99984 1.66675Z" />
          </svg>
        </StarIcon>
      ))}
    </RatingContainer>
  )
}

export default StarRating


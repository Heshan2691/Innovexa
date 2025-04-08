// components/Button.tsx
"use client";

import React from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          width: 120px;
          height: 40px;
          font-size: 14px;
        `;
      case "medium":
        return `
          width: 151px;
          height: 48px;
          font-size: 16px;
        `;
      case "large":
        return `
          width: 188px;
          height: 56px;
          font-size: 18px;
        `;
      default:
        return `
          width: 151px;
          height: 48px;
          font-size: 16px;
        `;
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          border: 2px solid ${colors.secondary};
          background: ${colors.secondary};
          color: ${colors.brightWhite};
          
          &:hover {
            background: ${colors.primary};
            border-color: ${colors.primary};
            color: ${colors.brightWhite};
          }
          
          &:active {
            background: ${colors.tertiary};
            border-color: ${colors.tertiary};
            color: ${colors.brightWhite};
          }
        `;
      case "secondary":
        return `
          border: 1px solid ${colors.secondary};
          background: transparent;
          color: ${colors.brightWhite};
          
          &:hover {
            border: 1px solid ${colors.cloudWhite};
            background: transparent;
            color: ${colors.brightWhite};
          }
          
          &:active {
            border: 1px solid ${colors.tertiary};
            background: transparent;
            color: ${colors.brightWhite};
          }
        `;
      case "tertiary":
        return `
          border: transparent;
          background: transparent;
          color: ${colors.secondary};
          
          &:hover {
            color: ${colors.cloudWhite};
          }
          
          &:active {
            color: ${colors.tertiary};
          }
        `;
      default:
        return `
          border: 2px solid ${colors.secondary};
          background: ${colors.secondary};
          color: ${colors.brightWhite};
          
          &:hover {
            background: ${colors.primary};
            border-color: ${colors.primary};
            color: ${colors.brightWhite};
          }
          
          &:active {
            background: ${colors.tertiary};
            border-color: ${colors.tertiary};
            color: ${colors.brightWhite};
          }
        `;
    }
  }}

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

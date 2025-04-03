// Button.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors'; // Import the colors from your styles/colors.ts

// Define the props for the Button component
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'; // Updated variant names
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

// Styled button component with dynamic styles based on props
const StyledButton = styled.button<ButtonProps>`
  // Base styles
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  font-family: 'Arial', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  // Size styles
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          width: 120px;
          height: 40px;
          font-size: 14px;
        `;
      case 'medium':
        return `
          width: 151px;
          height: 48px;
          font-size: 16px;
        `;
      case 'large':
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

  // Variant styles
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          border:  ${colors.secondary};
          background:${colors.secondary};
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
      case 'secondary':
        return `
          border: 1px solid ${colors.secondary};
          background: transparent;
          color: ${colors.brightWhite};
          
          &:hover {
            border-color: 1px solid ${colors.cloudWhite};
            background: transparent;
            color: ${colors.brightWhite};
          }
          
          &:active {
            border-color: 1px solid ${colors.tertiary};
            background: transparent;
            color: ${colors.brightWhite};
          }
        `;
      case 'tertiary':
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

  // Disabled state
  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

// Button component
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
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